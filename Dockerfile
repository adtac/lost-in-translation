FROM kstaken/apache2
LABEL name "lost-in-translation"
COPY index.html /var/www
COPY assets /var/www/assets
EXPOSE 80
CMD ["/usr/sbin/apache2", "-D", "FOREGROUND"]
