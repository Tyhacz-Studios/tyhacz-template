# Tyhacz App Template

A 🚫 no-black box, sort of ready-to-go full stack application source code template.

##### Features
- [x] 🚫 No black box magic code
- [x] 🔥 SEO Optimized Landing Page
- [x] 🔥 TypeScript
- [x] 🔥 Authentication ready to go
- [x] 🔥 Mongo support ready to go
- [x] 🔥 Stripe implementation ready to go
- [x] 🔥 ChatGPT implementation ready to go
- [x] 🔥 Twilio SMS implementation ready to go
- [x] 🔥 Mailgun Emailer implementation ready to go
- [x] 🔥 Example code to reference
- [x] 🔥 Image uploads ready to go
- [x] 🔥 API validation and middleware ready to go
- [x] 🔥 Basic, Responsive client layout and pages ready to go
- [x] 🔥 Toast notifications ready to go


## Get Started
```
npm install

# Setup your env
cp .env.example .env


# for development
npm run dev

# check entire codebase for TS errors
npm run tsc

# for production
npm run start
```

## Template To Do List
- [ ] Add css variables to `global.css`
- [ ] Add `<Skeleton />` component so react skeleton is imported once
- [ ] Better `<UploadZone />` styles and functionality
- [ ] Add `<RadioGroup />` input for easier radio forms
- [ ] Add `.env` or env var parsing for client side public keys


## Production

You just have to run `npm run start` to start the server.

With Nginx, a basic proxy is all that is requried.

Then, you can use `certbot` to generate SSL / HTTPS for you.

```nginx
server {
    server_name app.example.com

    # 

    location / {
       proxy_set_header X-Real-IP $remote_addr;
       proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
       proxy_set_header Host $http_host;
       proxy_set_header X-NginX-Proxy true;

       # replace :4646 with your app's env PORT
       proxy_pass http://localhost:4646;

       proxy_redirect off;
       proxy_http_version 1.1;
       proxy_set_header Upgrade $http_upgrade;
       proxy_set_header Connection "upgrade";
       proxy_set_header   X-Forwarded-Proto "https";
   }

   location ~ /.well-known {
       allow all;
   }

   # ipv6
   listen [::]:80;

   # ipv4
   listen 80;
}
```

