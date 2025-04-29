const GEMINI_API_KEY = "AIzaSyDxUES0EEtr8WJOXcGSZHRX-69jCpluPko"

const MODELS_LLM = ['Gemini 2.0 Flash']

function get_const_models_llm() {
  return MODELS_LLM;
}

function gemini_20flash(prompt, temperature = 1, model = 'gemini-2.0-flash') {
  const GEMINI_API = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${GEMINI_API_KEY}`
  
  prompt = prompt + '. Please format the following product names into a clean, visually appealing markdown bullet list. Each product name should appear on a separate line, starting with "- ". Just give answer, no extra comments, explanations, or introduction.'

  const response = UrlFetchApp.fetch(GEMINI_API, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      payload: JSON.stringify({ 
          contents: [{ parts: [{ text: prompt }] }], 
          generationConfig: { temperature: temperature } 
      })
  });
  const data = JSON.parse(response.getContentText());
  const text = data.candidates[0].content.parts[0].text;

  if (data && data.candidates && data.candidates.length > 0) {
      return text;
  }
  return 'Failed!';
}

function onOpen() {
  SpreadsheetApp.getUi().createMenu('calculation')
  .addItem('AI-powered calculation', 'showSiderbar')
  .addToUi();
}

function showSiderbar() {
  const html = HtmlService.createHtmlOutputFromFile('ui').setTitle('AI-powered calculation');
  SpreadsheetApp.getUi().showSidebar(html);
}

function columnToLetter(column) {
  let letter = '';
  while (column > 0) {
    let temp = (column - 1) % 26;
    letter = String.fromCharCode(temp + 65) + letter;
    column = Math.floor((column - 1) / 26);
  }
  return letter;
}

function get_values_row(row) {
  let sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  let range = sheet.getRange(row, 1, 1, sheet.getLastColumn());
  let values = range.getValues();

  var columns = {};
  for (var i = 0; i < sheet.getLastColumn(); i++) {
    var colLetter = columnToLetter(i + 1);

    columns[colLetter] = values[0][i];
  }
  return columns;
}

function prompt_to_run_each_row(headers, row_start, numOf, prompt, put_res) {
  row_headers = get_values_row(headers);

  let cnt = 1;
  let id_col = {};
  for (var [key, value] of Object.entries(row_headers)) {
    if (key == put_res) {
      put_res = value;
    }
    id_col[value] = cnt++; 
  }

  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  
  let res = []
  for (let row = row_start; row < row_start + numOf; row++) {
      let real_prompt = prompt;
      for (var [key, value] of Object.entries(row_headers)) {
          let placeholder = `{{${value}}}`;
          if (real_prompt.includes(placeholder)) {
            let value_row = "{{" + sheet.getRange(row, id_col[value]).getValue() + "}}";
            real_prompt = real_prompt.replaceAll(placeholder, value_row); 
          }
      }
      sheet.getRange(row, id_col[put_res]).setValue(gemini_20flash(real_prompt)); 
  }

}

function getLastRow() {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  const lastRow = sheet.getLastRow();
  return lastRow;
}


function GPT_SUMMARIZE(Text, Format, Temperature, Model = 'gemini-2.0-flash') {
  let prompt = `Summarize the following content professionally, focusing on clarity and brevity.

Content:
{{${Text}}}

Desired format: {{${Format}}}
`
  return gemini_20flash(prompt, Temperature, Model);
}

function test() {
  prompt_to_run_each_row(1, 2, 3, "You are an expert in the digital marketing. You are responsible for generating production name from {{Description}}.", 'C')
}








































