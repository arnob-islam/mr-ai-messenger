function setCookie(cname: string, cvalue: string, exdays: number) {
  const d = new Date();
  d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
  let expires = "expires=" + d.toUTCString();
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function getCookie(cname: string) {
  let name = cname + "=";
  let decodedCookie = decodeURIComponent(document.cookie);
  let ca = decodedCookie.split(";");
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    // eslint-disable-next-line eqeqeq
    while (c.charAt(0) == " ") {
      c = c.substring(1);
    }
    // eslint-disable-next-line eqeqeq
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}

interface I_AI_Values {
  _id?: string | number;
  question: string;
  answer: string;
}
interface I_MessengerValue {
  _id: string | number;
  messages: {}[];
  ai: I_AI_Values[];
}
export { setCookie, getCookie };
export type { I_MessengerValue };
