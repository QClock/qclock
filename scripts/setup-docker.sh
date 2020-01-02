

#(! test -d node_modules/usb)
# usb@1.6.2

if [ ! -d "node_modules/usb" ]; then
  # Take action if $DIR exists. #
  apk add --update \
    linux-headers \
    eudev-dev \
    python \
    python-dev \
    py-pip \
    build-base \
  && rm -rf /var/cache/apk/*
  npm install
fi

