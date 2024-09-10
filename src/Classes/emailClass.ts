const EmlParser = require('eml-parser');
const fs = require('fs');

class Email {
  Subject: string;
  Sender: string;
  path: string;
  emailFile: any;
  Body: string | undefined; // Change HTMLElement to string, as it represents HTML

  constructor(Path: string) {
    this.Subject = "placeHolder";
    this.Sender = "placeHolder";
    this.path = Path;
    this.Body = undefined;
  }

  // Return a promise to handle asynchronous setup
  setup(): Promise<void> {
    return new Promise((resolve, reject) => {
      this.emailFile = fs.createReadStream(this.path); // Use this.path instead of hardcoding 'test.eml'

      let parser = new EmlParser(this.emailFile);

      // Parse email body
      parser.getEmailBodyHtml()
        .then((htmlString: string) => {
          this.Body = htmlString; // Store the parsed HTML in Body
        })
        .catch((err: any) => {
          console.log('Failed to parse email body:', err);
          reject(err);
        });

      // Parse email headers
      parser.getEmailHeaders()
        .then((headers: any) => {
          this.Subject = headers.subject || "No Subject"; // Update Subject from headers
          this.Sender = headers.from ? headers.from[0].address : "Unknown Sender"; // Update Sender from headers
          resolve(); // Resolve after parsing is done
        })
        .catch((err: any) => {
          console.log('Failed to parse email headers:', err);
          reject(err);
        });
    });
  }

  // Getter for Subject
  get mailSubject() {
    return this.Subject;
  }

  // Getter for Sender
  get mailSender() {
    return this.Sender;
  }

  // Getter for Body (HTML content)
  get mailBody() {
    return this.Body;
  }
}

export default Email;
