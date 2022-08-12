# from google.colab import drive
# drive.mount('/content/drive/')

# !pip install transformers
import transformers
from transformers import pipeline 
from transformers import AutoTokenizer, AutoModelForSeq2SeqLM
# !pip install SentencePiece
import re
import torch
import sys
import json
import ast
# -------------------------------------------------------------------------------------------------------------------------------
def summarize(raw_text):
  model = AutoModelForSeq2SeqLM.from_pretrained('facebook/bart-large-cnn') # google/pegasus-newsroom or facebook/bart-large-cnn or Yale-LILY/brio-cnndm-cased
  tokenizer = AutoTokenizer.from_pretrained('facebook/bart-large-cnn') 

  # tokenize without truncation, thus will accept input of raw news of any length for summarization (will not truncate news if of 
  # length more than 1024 for bart and 512 for pegasus)
  # Also note that if raw input news is of length 200, then tokenized and encoded news will be of length approx 210++
  inputs_no_trunc = tokenizer.encode(raw_text, return_tensors='pt', max_length=None, truncation=True, padding="longest") 
  # print(len(inputs_no_trunc[0]))

  #--------------------------------------------------------------------------

  # get batches 200 tokens. It is useful as summarizer can't reach last parts of raw input news. Thus splitting news into small-small batches will
  # enable summarizer to run through every part of the raw input news 
  chunk_start = 0 
  max_length = 200
  chunk_end = max_length 
  inputs_batch_dict = {} 
  batch_id = 0
  while chunk_start <= len(inputs_no_trunc[0]): 
    inputs_batch = inputs_no_trunc[0][chunk_start:chunk_end] # get batch of 200 tokens 
    inputs_batch = torch.unsqueeze(inputs_batch, 0)
    inputs_batch_dict[batch_id] = inputs_batch 

    batch_id += 1 #counts for batch number
    chunk_start += max_length
    chunk_end += max_length
    
  #--------------------------------------------------------------------------

  # generate a summary on each batch 
  for batch_id in inputs_batch_dict:
    input_tokens = inputs_batch_dict[batch_id]
    encoded_summary = model.generate(input_tokens, num_beams = 4, length_penalty = 2.0, max_length = 250, min_length = 90, no_repeat_ngram_size = 3)
    decoded_summary = tokenizer.decode(encoded_summary.squeeze(), skip_special_tokens=True)
    inputs_batch_dict[batch_id] = decoded_summary

  #--------------------------------------------------------------------------

  # adding summaries of all batches
  decoded_summary = ""
  summary_batch_lst = [] 
  for batch_id in inputs_batch_dict:
    decoded_summary += inputs_batch_dict[batch_id]

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


#--------------------------------------------------------------------------------------------------------------------------------
# driver code
# print("Hello")
# if __name__ == "__main__":
  # raw_text = """The Indian Space Research Organisation (ISRO) on Sunday said the satellites onboard its maiden Small Satellite Launch Vehicle “are no longer usable” after the SSLV-D1 placed them in an elliptical orbit instead of a circular one. The space agency said a committee would analyse and make recommendations into Sunday’s episode and with the implementation of those recommendations “ISRO will come back soon with SSLV-D2.” “SSLV-D1 placed the satellites into 356 km x 76 km elliptical orbit instead of 356 km circular orbit. Satellites are no longer usable. Issue is reasonably identified. Failure of a logic to identify a sensor failure and go for a salvage action caused the deviation,” ISRO said in an update on its official Twitter handle. In its maiden SSLV mission, the launch vehicle carried The Earth Observation Satellite EOS-02 and the co-passenger student satellites AzaadiSAT. SSLV had suffered ‘data loss’ in its terminal stage, after performing “as expected” in all stages. It had earlier after lifted off from the spaceport here on Sunday morning. The Earth Observation Satellite EOS-02 and the co-passenger student satellites AzaadiSAT are the major payloads for the SSLV. The EOS-02 is an experimental optical remote sensing satellite with a high spatial resolution. It is to realise and fly an experimental imaging satellite with a short turnaround time and to demonstrate launch-on-demand capability. EOS-02 belongs to the microsatellite series of spacecraft. The AzaadiSAT is a 8U CubeSat weighing around 8 kilograms. It carries 75 different payloads each weighing around 50 grams. Girl students from rural regions across the country were provided guidance to build these payloads. The payloads are integrated by the student team of 'Space Kidz India'. The ground system developed by 'Space Kidz India' will be utilised for receiving the data from this satellite, ISRO said. It is not the first time for ISRO to face a setback on its maiden launch missions as PSLV -- dubbed as one of the trusted workhorses for the space agency -- was not successful in its first flight way back on September 20, 1993. After its first successful launch in October 1994, PSLV emerged as the reliable and versatile launch vehicle of India with 39 consecutively successful missions by June 2017. It had successfully launched the CHANDRAYAAN-1 in 2008 and also the Mars Orbiter Spacecraft in 2013 that later travelled to the Moon and Mars, respectively. The first flight of GSLV in April 2001 carrying GSAT-1 was successful for ISRO. From January 2014, the vehicle has achieved four consecutive successes, ISRO said. The first developmental flight of GSLV Mk-III, successfully placed GSAT-19 satellite to a Geosynchronous Transfer Orbit (GTO) on June 5, 2017."""
  # syss = sys.argv[1]
  # print(syss)
  
  # summary = summarize(raw_text)
  # print(summary,"\n\n\n")
  # just for testing "hundred_word_summary" function
  # summary = "The Calcutta High Court has directed the Enforcement Directorate (ED) to transfer arrested West Bengal minister Partha Chatterjee to AIIMS Bhubaneswar on Monday morning, saying that political leaders belonging to the ruling party had successfully avoided ED quizzing in the past by taking shelter in SSKM hospital. The court was hearing the Enforcement Directorate’s plea against the transfer of the arrested West Bengal minister to state-run SSKM Hospital. The court said that the accused would be taken to the Netaji Subhash Chandra Bose International Airport in Kolkata by an ambulance from the SSKM Hospital and would be accompanied by his advocate and an SSKM doctor. The court has asked the AIIMS Bhubaneswar authorities to medically examine the accused by a team of specialist doctors in cardiology, nephrology, respiratory medicine, and endocrinology. The court also directed the AIIMS authorities to submit the reports to the investigating officer in the case, SSKM medical officer, and the advocate representing the accused by 3 pm on Monday. The investigating officer will forward a soft copy of the report to his counterpart in Kolkata who, in turn, will produce it before the learned Special Judge under the Prevention of Money Laundering (PML) Act, 2002, the court said. The special judge under the PML Act will hear the case at 4 pm on Monday, the court said. The court also asked the investigating officer to arrange for a virtual hearing in the case. The Trinamool Congress (TMC) leader Partha Chatterjee was arrested by the Enforcement Directorate on Saturday, July 23, in connection with its probe into the alleged school jobs scam in West Bengal. The arrest of Partha Chatterjee followed after Rs 21 crore in cash was recovered from the Kolkata home of Arpita Mukherjee, a close aide of the former education minister. Arpita Mukherjee was also arrested by the agency on Saturday."
  # print(len(summary.split()))

  # final_summary = hundred_word_summary(summary)
  # print(final_summary)
  # print(len(final_summary.split()))
  