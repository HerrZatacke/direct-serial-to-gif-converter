char c2h(char c) {
  return "0123456789ABCDEF"[0x0F & (unsigned char)c];
}

void setup() {
  Serial.begin(19200, SERIAL_7E1);
  randomSeed(analogRead(0));
  while (!Serial) {}
}

void printAllRandom(char count, char bright) {
  for (char i = 0;i < count; i++) {
    for (char j = 0;j < 32; j++) {
      Serial.write(c2h(random(0, bright)));
    }
    Serial.write("\r\n");
    // delay(100);    
  }
}

void printAllFF(char count) {
  for (char i = 0;i < count; i++) {
    line("00000000000000000000000000000000");
  }
}

void line(String str) {
  for(int i=0; i<str.length(); i++) {
    Serial.write(str.charAt(i));
  }
  Serial.write("\r\n");
  // delay(100);
}

void loop() { // run over and over
  line("!{\"command\":\"INIT\"}");
  printAllFF(42);
  printAllRandom(16, 1);
  printAllFF(4);
  printAllRandom(16, 2);
  printAllFF(4);  
  printAllRandom(16, 3);
  printAllFF(4);  
  printAllRandom(16, 4);
  printAllFF(4);  
  printAllRandom(16, 5);
  printAllFF(4);  
  printAllRandom(16, 6);
  printAllFF(4);  
  printAllRandom(16, 7);
  printAllFF(4);  
  printAllRandom(16, 8);
  printAllFF(4);  
  printAllRandom(16, 9);
  printAllFF(4);  
  printAllRandom(16, 10);
  printAllFF(4);  
  printAllRandom(16, 11);
  printAllFF(4);  
  printAllRandom(16, 12);
  printAllFF(4);  
  printAllRandom(16, 13);
  printAllFF(4);  
  printAllRandom(16, 14);
  printAllFF(42);
  line("!{\"command\":\"DATA\",\"compressed\":0,\"more\":0}");  
}
