# Utiliser une image de base PHP avec Apache
FROM php:8.2-apache

# Installer Composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# Installer les extensions PHP nécessaires
RUN apt-get update && apt-get install -y libpng-dev libjpeg-dev libfreetype6-dev \
    && docker-php-ext-configure gd --with-freetype --with-jpeg \
    && docker-php-ext-install gd \
    && docker-php-ext-install pdo pdo_mysql \
    && a2enmod rewrite headers  # Activez le module headers ici

# Copier uniquement les fichiers nécessaires pour composer d'abord
COPY composer.json /var/www/html/composer.json

# Définir le répertoire de travail
WORKDIR /var/www/html

# Installer les dépendances Composer
RUN composer install --no-dev --optimize-autoloader --no-interaction --no-scripts --prefer-dist

# Copier les autres fichiers de l'application
COPY . /var/www/html

# Ajouter la configuration CORS dans Apache
RUN echo "Header set Access-Control-Allow-Origin '*'" >> /etc/apache2/apache2.conf && \
    echo "Header set Access-Control-Allow-Methods 'GET, POST, PUT, DELETE, OPTIONS'" >> /etc/apache2/apache2.conf && \
    echo "Header set Access-Control-Allow-Headers 'Content-Type, Authorization, X-Requested-With'" >> /etc/apache2/apache2.conf && \
    echo "Header set Access-Control-Expose-Headers 'Content-Length, Content-Type'" >> /etc/apache2/apache2.conf && \
    echo "Header set Access-Control-Max-Age '86400'" >> /etc/apache2/apache2.conf

# Créer le dossier uploads avec les bonnes permissions
RUN mkdir -p /var/www/html/uploads && chown -R www-data:www-data /var/www/html/uploads

# Exposer le port 80 pour Apache
EXPOSE 80

# Commande pour démarrer Apache
CMD ["apache2-foreground"]
