RUN sudo apt-get update \
 && sudo apt-get install -y doxygen \
 && sudo rm -rf /var/lib/apt/lists/* \
 && npm i -g @sasjs/cli
