from transformers import AutoTokenizer, AutoModelForSeq2SeqLM
import re

# -------------------------------------------------------------------------------------------------------------------------------
# model = AutoModelForSeq2SeqLM.from_pretrained('facebook/bart-large-cnn') # google/pegasus-newsroom or facebook/bart-large-cnn or Yale-LILY/brio-cnndm-cased
# tokenizer = AutoTokenizer.from_pretrained('facebook/bart-large-cnn') 

model = AutoModelForSeq2SeqLM.from_pretrained('./bart-large-cnn') # google/pegasus-newsroom or facebook/bart-large-cnn or Yale-LILY/brio-cnndm-cased
tokenizer = AutoTokenizer.from_pretrained('./bart-large-cnn') 

def summarize(raw_text):

  # tokenize without truncation, thus will accept input of raw news of any length for summarization (will not truncate news if of 
  # length more than 1024 for bart and 512 for pegasus)
  # Also note that if raw input news is of length 200, then tokenized and encoded news will be of length approx 210++
  inputs_no_trunc = tokenizer.encode(raw_text, return_tensors='pt', max_length=None, truncation=True, padding="longest") 
  # print(len(inputs_no_trunc[0]))

  #--------------------------------------------------------------------------

  # get batches 200 tokens. It is useful as summarizer can't reach last parts of raw input news. Thus splitting news into small-small batches will
  # enable summarizer to run through every part of the raw input news 
  encoded_summary = model.generate(inputs_no_trunc, num_beams = 4, length_penalty = 2.0, max_length = 250, min_length = 90, no_repeat_ngram_size = 3)
  decoded_summary = tokenizer.decode(encoded_summary.squeeze(), skip_special_tokens=True)
  return decoded_summary

#--------------------------------------------------------------------------------------------------------------------------------
def hundred_word_summary(decoded_summary):

  # if summary is more than 100-words
  if len(decoded_summary.split())>100:

      # task1:-find position of all full stops
    
      # finds part of sentences around full-stop like "minister. Arpita"
      positions_of_fullstops = list()
      for string_containing_fullstop in re.finditer('([a-zA-Z0-9]+\s*\.\s*[A-Z0-9]+)', decoded_summary):
        # finds position of "m" out of whole extracted part "minister. Arpita"
        string_containing_fullstop_position = string_containing_fullstop.start()
        # within extracted part "minister. Arpita", search for position of full-stop
        full_stop = re.search('\.', string_containing_fullstop.group())
        full_stop_relativeposition = full_stop.start()

        # now as position of full stop within part "minister. Arpita", is relative to position of "m" of "minister. Arpita", thus
        # to get actual position of full stop in "minister. Arpita" add position of full stop in the part "minister. Arpita" to the 
        # position of "m" of "minister. Arpita" part.
        full_stop_finalposition = full_stop_relativeposition+string_containing_fullstop_position # here positions at character level
        # adding this final position of full stop in a list
        positions_of_fullstops.append(full_stop_finalposition)

      #--------------------------------------------------------------------------

      # task2:-finding at which full stop (whose locations we got above) do we need to terminate our summary so that our summary shouldn't succeed more than 100 words
      #        i.e. required full stop must be located before summary length touches 100 words. 
      
      # as full-stop positions is in character level thus we want to know what "100" in word level means in character level
      # for that first we find string-part located around 100th position (taking string-part and not just word at 100th-word-level position because using re.search
      # on word at 100th-word-level position can find other words in summary similar to it......so we take a string-part around 100th-word-level position as it'll unique)
      words_collection = decoded_summary.split()
      # string-part aroun 100th-word-level position ex: "recovered from the"
      target = str(words_collection[100])+" "+str(words_collection[101])+" "+str(words_collection[102]) # 99,100,101 is positioning at word level
      res = re.search(target, decoded_summary)
      # finding position of "r" of "recovered from the". This gives a round-off character-level-position corresponding to 100th-word-level position. ex:460
      target_position = res.start()

      # now whichever full-stop's character-level-position is close and less than 460 character-level-position (corresponding to 100th-word-level position), will
      # be used as position to terminate the summary
      for i in positions_of_fullstops:
        if i<target_position:
          termination_position = i

      #--------------------------------------------------------------------------

      # task3:- preparing the final summary 

      # we keep adding characters to "final_summary" string untill number of characters (counted by "count" variable) remains less than "termination_position+1"
      # i.e we keep adding characters untill the aimed full stop (closest to 100th-word-level position) is reached
      count = 0
      final_summary = ''
      chk_collection = list(decoded_summary)
      for chk in chk_collection:
        if count<(termination_position+1):
          final_summary+=chk
          count+=1

  #----------------------------------------------------------------------------------------

  # if summary is under 100-words
  else:
    final_summary = decoded_summary

  return final_summary

# if __name__== "__main__":
#   raw_text = "The indian sapce is very gog jking to yo"
#   summary = summarize(raw_text)
#   print(summary)
