void setup() {
  DDRD = 252;
  Serial.begin(9600);
}

void loop() {
  Serial.println((PIND & B11111100) >> 2, DEC);
}

