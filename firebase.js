import admin from "firebase-admin";

const firebaseConfig = {
  type: "service_account",
  project_id: "shiphitmobileapppickup-fb7e2",
  private_key_id: "8e8df566df5697a055ba9f364c69bb1b426e7eae",
  private_key:
    "-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQC+6s1/6BjUcxVj\new8BJy6QvrDZPsxMPRQxw6s4Z7sXBvJEbWSBbSlMfgxw33z0TM9IdyvMYaR3W2pd\nt6XCPDlEBln3q6fwOXgdXEZvWsjnYyTx6kkaTExgrjKRMZlARmkbMXbIRYeAwpK5\np5BZR4HAxsZ5RTvSwjcfS8gz4bxMYl7hK3APTq8WDTznjq0mKciLOcPg/78cK2G/\nXf8gAlnV6rTRT5S/6ura2EjhUahsbcxVXhW7BOLVuU6Q87mcQDKcpHfotPzUsHR0\nOY8uQNpQYC+m/fL0XxLccQ6/3HgLyMOdghiDBZLLnZ/EcsO3O71y6os6AAQGhOfI\njl4Cfu+9AgMBAAECggEAK2LGLQdEX0FA7tDIFeG+2AdxvojiGgA2XuHBvwl5r4+1\nTh4S/UOeo0Kw1pS/O3BaGbR1SFa3LqWgXChQG74eYGpWFy3T9ghFVtzBp+wYZFb4\nTh6JGtgUclMb7Dl6g2wM1jBtNzFvy+/LsrOU3ukcYD/72hLE984Jg0vwNPQbW7sJ\nIYdyMwITjQq9KfifRXq2YrnFsqdw18VrXO9Lue1v/P7J+TQboB+OyGAHe3cIFYiw\nRqslnkwLY7g0iLbFekeGwx82j5fu4ms3mujnGBvWEZlRJXiqQu57qhf9SFkZC8yV\nx0WdBRiNYttqFxthP9kwQUgLneyXtvA+/L7BUSzySQKBgQD1QdmWed1eWtidefCp\n9uWVA59s1sg3woWBUJosjaLl2xM8MFhqz4b8vIIO3YzjXYJO7QDojDnCSmbPZphl\nLblkvw9/lDLuAR+Xc2GwRonYMw7S4O2BQ+ZlEP16iemHN6+GKMnyEpYGq1MCsdzz\n1iofOeFDPVyIcwMfHJGvYzlHFQKBgQDHR57CF2vL8tQV+QhB+5447ZhqiJM7Z9MJ\n2QdjxIXzAfdPYBR2CyrrkBNJWgkhKhUYRSQH8rX5DWGTYqmju3f/2lebQmL7CBOV\nzv/Tk8/ySfN1gPI8F6cZtLdlXWvYfIKDQjPmz3+L3Hv7NBZKEmKW3uenFePSsrXA\ndKSVSWmwCQKBgQDrQQ8GWD8PkvTVmXJQlpQCLEdwj1XepqiJMlexBOuMsGfzBCzL\nx+Uj6W6X88yBC+FC8/Q7HMcKp3OW3kKwSvvat6qWJgH0av9ytyqte/wddlxxy3AG\n3qrRp0p9kGyBV9j2R4nuugVOwGgP3ayj+HrPGSYK6YEpIamM3kqggf0fQQKBgEH6\nQmO8YWI62WEU/FjsN6xdbbMH2Mc4TrTZ+ApeDIMySXEsPFoAxIsNPnVwq8khJ67L\nZWyEPR9iAMZNSiD9dnNtFMhAqIi4WdOlnymrrJNpTIPA13Jx2k82d+nFjmk0f/l5\nN7nZRT9HFn1K9346rA2La2L0amNd67L2a29JyQYRAoGBAJ42EY5LgMgHWL/ILRgA\ntTg7s01i2dKYUgB5kHlzt9Tw0dCgur0lxNHOCYWCVdzEJNl+5ZgJJNz5a1meFW1h\nDV3wI8W5DSArPasHxvJzLYczgk5e6bNFjWFtROwj5A/UQqOTm0Z5jER8vehqJH0C\nYDD/aghh3qeTF/bPUZYUDRP2\n-----END PRIVATE KEY-----\n",
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

// Initialize Firebase Admin SDK
if (!admin.apps.length) {
  admin.initializeApp(
    {
      credential: admin.credential.cert(firebaseConfig),
    },
    console.log("Running Good!")
  );
}

// Export services for reuse
export const db = admin.firestore();

console.log(firebaseConfig.project_id);
