# Stage: Serve static files with nginx
FROM nginx:alpine

# Copy static files to nginx web root
COPY . /usr/share/nginx/html

# Remove default nginx config and use custom
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

# Health check — ping nginx every 30s
HEALTHCHECK --interval=30s --timeout=5s --start-period=5s --retries=3 \
  CMD wget -qO- http://localhost/ || exit 1

CMD ["nginx", "-g", "daemon off;"]
