import axios from "axios";

async function sendDailyupdatesNotification(
  name,
  status,
  location,
  estimatedTAT,
  awbNumber,
  consignorphonenumber
) {
  let formated_status = status.toLowerCase();
  formated_status =
    formated_status.charAt(0).toUpperCase() + formated_status.slice(1);

  const payload = {
    messages: [
      {
        content: {
          language: "en",
          templateData: {
            header: {
              type: "TEXT",
              placeholder: "Update",
            },
            body: {
              placeholders: [name, formated_status, location, estimatedTAT],
            },
            buttons: [
              {
                type: "URL",
                parameter: String(awbNumber),
              },
            ],
          },
          templateName: "shipmentstatusupdate",
        },
        from: "+919600690881",
        to: `+91${consignorphonenumber}`,
      },
    ],
  };
  axios
    .post("https://public.doubletick.io/whatsapp/message/template", payload, {
      headers: {
        Authorization: "key_z6hIuLo8GC",
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
    .then((response) => {
      console.log("Message sent:", response.data);
    })
    .catch((error) => {
      console.error(
        "Error sending message:",
        error.response?.data || error.message
      );
    });
}

export default { sendDailyupdatesNotification: sendDailyupdatesNotification };