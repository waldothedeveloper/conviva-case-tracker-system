// var username = "xxx";
// var password = "xxx";

var username = "xxx";
var password = "xxx";

const SOAPTicketHelper = ticketNumber => {
  const options = {
    method: "POST",
    headers: {
      Host: "webservices14.autotask.net",
      Authorization:
        "Basic " + Buffer.from(username + ":" + password).toString("base64"),
      Accept: "application/json",
      SOAPAction: "http://autotask.net/ATWS/v1_6/query",
      "Content-Type": "text/xml"
    },
    body: `<?xml version="1.0" encoding="utf-8"?>\n<soap:Envelope\n  xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/"\n  xmlns:x-si="http://www.w3.org/2001/XMLSchema-instance"\n  xmlns:xsd="http://www.w3.org/2001/XMLSchema">\n  <soap:Header>\n    <AutotaskIntegrations\n      xmlns="http://autotask.net/ATWS/v1_6/">\n      <IntegrationCode>CZQT7KI35IMIXUTRVAIWCLUOH3A</IntegrationCode>\n    </AutotaskIntegrations>\n  </soap:Header>\n  <soap:Body>\n    <query\n      xmlns="http://autotask.net/ATWS/v1_6/">\n      <sXML>\n        <![CDATA[<queryxml><entity>Ticket</entity><query><condition><field>TicketNumber<expression op="equals">${ticketNumber}</expression></field></condition></query></queryxml>]]>\n      </sXML>\n    </query>\n  </soap:Body>\n</soap:Envelope>`
  };

  return options;
};

module.exports = SOAPTicketHelper;
