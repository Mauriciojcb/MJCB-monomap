import 'dotenv/config';
import * as env from 'env-var';

export const envs = {
    SMTP_USER: env.get("SMTP_USER").required().asString(),
    SMTP_PASS: env.get("SMTP_PASS").required().asString()
}