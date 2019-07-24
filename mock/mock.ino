
char c2h(char c) {
  return "0123456789ABCDEF"[0x0F & (unsigned char)c];
}

void setup() {
  pinMode(LED_BUILTIN, OUTPUT);
  Serial.begin(19200, SERIAL_7E1);
  randomSeed(analogRead(0));
  while (!Serial) {}
}

void printAllRandom(char count) {
  digitalWrite(LED_BUILTIN, !digitalRead(LED_BUILTIN));
  for (char i = 0; i < count; i++) {
    char bright = random(1, 15);
    for (char j = 0; j < 32; j++) {
      Serial.write(c2h(random(0, bright)));
    }
    Serial.write("\r\n");
  }
}

void printAllFF(char count) {
  for (char i = 0; i < count; i++) {
    line("00000000000000000000000000000000");
  }
}

void line(String str) {
  for (int i = 0; i < str.length(); i++) {
    Serial.write(str.charAt(i));
  }
  Serial.write("\r\n");
}

void loop() { // run over and over
  line("!{\"command\":\"INIT\"}");
  printAllFF(42);
  printAllRandom(16);
  printAllFF(4);
  printAllRandom(16);
  printAllFF(4);
  printAllRandom(16);
  printAllFF(4);
  printAllRandom(16);
  printAllFF(4);
  printAllRandom(16);
  printAllFF(4);
  printAllRandom(16);
  printAllFF(4);
  printAllRandom(16);
  printAllFF(4);
  printAllRandom(16);
  printAllFF(4);
  printAllRandom(16);
  printAllFF(4);
  printAllRandom(16);
  printAllFF(4);
  printAllRandom(16);
  printAllFF(4);
  printAllRandom(16);
  printAllFF(4);
  printAllRandom(16);
  printAllFF(4);
  printAllRandom(16);
  printAllFF(42);
  line("!{\"command\":\"DATA\",\"compressed\":0,\"more\":0}");
}
