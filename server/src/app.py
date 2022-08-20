from flask import Flask, request
from Simplify import simplify_it
from indexSumarize import summarize, hundred_word_summary

app = Flask(__name__)

@app.route('/get', methods=['GET', 'POST'])
def index():
    global final_output, data
    data=dict()
    if request.method == 'POST':
        data = request.get_json()
        input_text = data['news']
        chunk_start = 0 
        max_length = 200
        chunk_end = max_length 
        inputs_batch_dict = {} 
        batch_id = 0
        print(input_text)
        while chunk_start <= len(input_text): 
            inputs_batch = input_text[chunk_start:chunk_end] # get batch of 250 tokens 
            inputs_batch_dict[batch_id] = inputs_batch 
            batch_id += 1 #counts for batch number
            chunk_start += max_length
            chunk_end += max_length
    
#---------------------------------------------------------------------------------

  # apply function on each batch 
        for batch_id in inputs_batch_dict:
            input = inputs_batch_dict[batch_id]
            print("This is first batch", input)
            output = summarize(input)
            print("this is output", output)
            inputs_batch_dict[batch_id] = output

  #--------------------------------------------------------------------------

  # adding results of all batches
        final_output = ""
        for batch_id in inputs_batch_dict:
            print("this is final", inputs_batch_dict[batch_id])
            final_output += inputs_batch_dict[batch_id]

        print(final_output)
        hundred = hundred_word_summary(final_output)
        print("This is hundred",hundred)
        data['news'] = hundred
        simplified = simplify_it(hundred)
        print(simplified)
        data['simplify'] = simplified
    return data

if __name__ == "__main__":
    app.run(port=5000, debug=True)
