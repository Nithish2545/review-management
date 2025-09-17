// firestore.js
import admin from "firebase-admin";

const serviceAccount = {
  type: "service_account",
  project_id: "shiphitmobileapppickup-fb7e2",
  private_key_id: "ecccc9b3233326abf66c05daa9ba34ba01c9acef",
  private_key:
    "-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQCfeV3IcFvcHx3N\nGBd6hIpvooAlpWm5tBKkRtfyYJpMOBvgUyoLIRD699OKUwYXy6mL0fVcDxdIQTbY\nE5kZRza/ZMw7MaklAZLInW+avfQUzufIi759hM1ZpKxl/uFBH7Iw2qU30jRq6QyW\nDdwaIga3GwrV4we8o+NvFi3vQ6AWBmYbysjWEDe5iWyVYlbVshhhZW274HSQZ3qY\nWJjcyi4MS6fB+6jhHVSyULcG75Gql5R86UY7h3KzXjvdBMoQM6GaZyVOfd2YeNTd\nRhGyJTOSqGsHorwqGUHugI8TlfVzhiOCazVtAGsPUwKzTiS2WcOJRyojX1Akh5S4\nWPw9thpzAgMBAAECggEAFJnHBaeOFkdmwCHGlqscfwNM7pAJslWSuunz53mXNRVi\ndH4JxlpFKUZua0YCWXyTsF41BellJo5WGV+evWc3qU3KHDN0GDW10niT/DdhmnaH\n9p4mw2wuYtAk/SAJ1THVAP6drTJYVx834wJzVmTi3TB/G9YyH6pELQt+b5Qaz/1b\nMet/cm37o3TRRATLnlH98Mt931gHGRIIjIWkV41vIShigBZgiGBFe5k7BaUlyng6\nUEDjON7iLahFHUxjB3Nx/3DjVWCYvfSu6JBHEojp9C07EtOmIOP8wACsSpjfs9Us\nD66DwDkzpVTdojsGsBMcI6m9fn+/ZnqnM+1pTDcdMQKBgQDds06VHEyHBZDsnGl3\nWQFv/ynpUQlUUit8UoJBYW7GfgYbBvHerx3WM9Dn8S+oK6+6gO4tz7Wj/ZO70yPA\n09lYhklVtpZMUop/XwI9cLl3faz0piufv2kdnJdxaLfBqVeKl6Y1AcAmlidtS9Vq\n93468GeSa1N4SW4uRjr6HT42xQKBgQC4JYQVTswnrbpOuASOWnjE2D2dIJPNLLjj\n41BrSEK1ja587onNIss+/zvQVBi1radratwWIV5yGmlZtYdHK1gf/N3Nd/mGjU+8\nkbPnhfEh8/yDYa9yZiYVUmlwixULywCTz6iItlW9p0yDtjFlKkVsNcFCMmohVCxH\nV8qDQcdf1wKBgQDPixR9sshRfnx1hNeWytP1rMHnkd1R+rqK4BLgcf3qBABjPNUg\nyn78D/X5rGgY3wzbY+eVK2W356NtqfNGiQxnOw9cFloNiRfutVq7edOmcRiAzy73\nlZEqD3YWzRl5SraRH/aQmNrxRJAUWXGpeZfKRVQwVhkF+ngTCdwcWVPsoQKBgE8T\nlS/NQbA8U0ggj5xNz5TAQ10pMy8laFQ8NjmLs1HhgK+Xg8d6jIsF8bqZkm7aHo3r\nOo2qULNxEhJ6+JegTlyWKu1j+txD7JzOeNIQW6c37hTBKyVWJj57wFma8DO7Pgk7\nYGUs347su9fHslh+GYfJYa86lQaw7b7JPWa2JZbLAoGBAIaJJYsYpEXG4EE/r2tG\n6gJOdKugSoCJTwYbgXMdPqmBaNR6wlwW4dvGnCWM/sjtJVo8pFd7GNQ+rIAJDELA\nh625i5/zdwqwr/Q0WEfjv7xJw+lM1JoJV4ygoNQER/e6iYjZY8hocOLPylA9BTvR\nE+MdorYyfiJdcKSe4d5HDEDn\n-----END PRIVATE KEY-----\n",
  client_email:
    "firebase-adminsdk-fbsvc@shiphitmobileapppickup-fb7e2.iam.gserviceaccount.com",
  client_id: "109503023363384616572",
  auth_uri: "https://accounts.google.com/o/oauth2/auth",
  token_uri: "https://oauth2.googleapis.com/token",
  auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
  client_x509_cert_url:
    "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-fbsvc%40shiphitmobileapppickup-fb7e2.iam.gserviceaccount.com",
  universe_domain: "googleapis.com",
};

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
}

const db = admin.firestore();

export default db;