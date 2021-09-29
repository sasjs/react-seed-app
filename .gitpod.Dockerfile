RUN sudo apt-get update \
 && sudo apt-get install -y doxygen \
 && npm i -g @sasjs/cli \
 && sudo rm -rf /var/lib/apt/lists/* 

