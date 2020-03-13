FROM python:3

ENV PYTHONUNBUFFERED 1

RUN apt-get update && apt-get install -y \
  python3-dev \
  gcc \
  gettext \
  postgresql-client libpq-dev \
  sqlite3 \
  # Pillow dependencies
  libtiff5-dev libjpeg62-turbo-dev zlib1g-dev \
  libfreetype6-dev liblcms2-dev libwebp-dev libharfbuzz-dev libfribidi-dev \
  tcl8.6-dev tk8.6-dev python-tk \
  # CFFI dependencies
  libffi-dev \
  # Weasyprint dependencies
  build-essential \
  python3-pip \
  python3-setuptools \
  python3-wheel \
  python3-cffi \
  libcairo2 \
  libpango-1.0-0 \
  libpangocairo-1.0-0 \
  libgdk-pixbuf2.0-0 \
  shared-mime-info \
  # graphviz dependencies
  graphviz-dev graphviz \
  --no-install-recommends && rm -rf /var/lib/apt/lists/*

COPY ./compose/production/django/entrypoint /entrypoint
RUN sed -i 's/\r//' /entrypoint
RUN chmod +x /entrypoint

COPY ./compose/local/django/start /start
RUN sed -i 's/\r//' /start
RUN chmod +x /start

COPY ./compose/local/django/celery/worker/start /start-celeryworker
RUN sed -i 's/\r//' /start-celeryworker
RUN chmod +x /start-celeryworker

COPY ./compose/local/django/celery/beat/start /start-celerybeat
RUN sed -i 's/\r//' /start-celerybeat
RUN chmod +x /start-celerybeat

WORKDIR /app

# Requirements are installed here to ensure they will be cached.
RUN pip install -U pip && pip install pipenv

COPY Pipfile Pipfile.lock ./
RUN set -ex && pipenv install --deploy --system --dev

ENTRYPOINT ["/entrypoint"]
