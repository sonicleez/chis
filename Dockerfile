# Stage: Serve static files with nginx
FROM nginx:alpine

# Copy static files to nginx web root
COPY . /usr/share/nginx/html

# Remove default nginx config and use custom
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
