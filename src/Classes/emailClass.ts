class Email {
  Subject: string;
  Sender: string;
  pathToEmail: string;
  emailFile: string | Uint8Array; // Define emailFile type to be string or byte array
  Body: string | undefined;

  constructor(Path: string) {
    this.Subject = "Email Failed to Load";
    this.Sender = "Sebastien@Admin";
    this.pathToEmail = Path;
    this.Body = '<p>Failed To Load</p>';
    this.emailFile = ''; // Initialize as empty string or buffer
  }
  setSubject(subject:string){
    this.Subject = subject
  }
  setBody(body:string){
    this.Body = body
  }
  async setup(): Promise<void> {
    try {
      const response = await fetch(this.pathToEmail);
      if (!response.ok) {
        this.Subject = '!Response Worked'
        throw new Error('Failed to fetch email');
        
      }
      else{
        this.Subject = 'Response Worked'
      }

      const rawEmail = await response.text();  
      const lines = rawEmail.split(/\r?\n/);

      let isInHeaders = true;
      let isInBody = false;
      let boundary = '';
      let currentBody = '';
      let contentType = '';

      lines.forEach((line) => {
        // Extract headers
        if (isInHeaders) {
          if (line.startsWith('Subject: ')) {
            this.Subject = line.slice(9).trim();
          } else if (line.startsWith('From: ')) {
            this.Sender = line.slice(6).trim();
          } else if (line.startsWith('Content-Type: multipart/alternative; boundary=')) {
            boundary = line.match(/boundary="(.+?)"/)?.[1] || '';
          }

          // End of headers
          if (line.trim() === '') {
            isInHeaders = false;
            isInBody = true;
          }
        }

        // Body processing based on the boundary and content type
        if (isInBody) {
          if (line.includes(`--${boundary}`)) {
            if (currentBody && contentType === 'text/html') {
              this.Body = currentBody.trim();
            }
            currentBody = ''; // Reset body content for the next part
            contentType = ''; // Reset content type
          } else if (line.startsWith('Content-Type:')) {
            contentType = line.match(/Content-Type:\s*(.+?);/)?.[1] || '';
          } else {
            // Accumulate the body content
            if (contentType === 'text/html') {
              currentBody += line + '\n';
            }
          }
        }
      });

      // In case the last part is the body we're interested in
      if (currentBody && contentType === 'text/html') {
        this.Body = currentBody.trim();
      }
    } catch (error) {
      console.error("Error while fetching or parsing the email:", error);
    }
  }

  get html(): string | undefined {
    return this.Body;
  }
}

export default Email;
