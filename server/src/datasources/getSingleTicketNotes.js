var username = process.env.API_USERNAME;
var password = process.env.API_PASSWORD;

const SOAPTicketNotesHelper = ticketID => {
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
    body: `<?xml version="1.0" encoding="utf-8"?>\n<soap:Envelope\n  xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/"\n  xmlns:x-si="http://www.w3.org/2001/XMLSchema-instance"\n  xmlns:xsd="http://www.w3.org/2001/XMLSchema">\n    <soap:Header>\n        <AutotaskIntegrations\n      xmlns="http://autotask.net/ATWS/v1_6/">\n            <IntegrationCode>CZQT7KI35IMIXUTRVAIWCLUOH3A</IntegrationCode>\n        </AutotaskIntegrations>\n    </soap:Header>\n    <soap:Body>\n        <query\n      xmlns="http://autotask.net/ATWS/v1_6/">\n            <sXML>\n                <![CDATA[<queryxml>\n                <entity>TicketNote</entity>\n\t                <query>\n\t\t                <condition>\n\t\t\t                <field>TicketID<expression op="equals">${ticketID}</expression>\n\t\t\t                </field>\n\t\t\t            </condition>\n\t\t\t            <condition>\n\t\t\t            \t<field>CreatorResourceID<expression op="notequal">4</expression>\n\t\t\t                </field>\n\t\t                </condition>\n\t                </query>\n                </queryxml>]]>\n\t\t\t</sXML>\n\t\t</query>\n\t</soap:Body>\n</soap:Envelope>`
  };

  return options;
};

module.exports = SOAPTicketNotesHelper;
