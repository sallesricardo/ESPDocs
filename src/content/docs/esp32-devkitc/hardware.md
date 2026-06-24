---
title: Hardware
description: ESP32-DevKitC Hardware
---

# Hardware ESP32-DevKitC

![ESP32-DevKitC](/placas/esp32-devkitc.jpg)

## ESP32 Peripherals Features

- 18 Analog-to-Digital Converter (ADC) channels
- 10 Capacitive sensing GPIOs
- 3 UART interfaces
- 3 SPI interfaces
- 2 I2C interfaces
- 16 PWM output channels
- 2 Digital-to-Analog Converters (DAC)
- 2 I2S interfaces


## GPIO Pins

### Onboard LED

- GPIO2


### Input Only Pins

- GPIO 34
- GPIO 35
- GPIO 36
- GPIO 39


### Pins with internal pull up INPUT_PULLUP

- GPIO14
- GPIO16
- GPIO17
- GPIO18
- GPIO19
- GPIO21
- GPIO22
- GPIO23


### Pins without internal pull up

- GPIO13
- GPIO25
- GPIO26
- GPIO27
- GPIO32
- GPIO33


### Analog Pins

The ESP32 has an analog to digital converter built into it with a resolution of up to 12 bits which is 4096 distinct values.

- ADC1_CH0
- ADC1_CH3
- ADC1_CH4
- ADC1_CH5
- ADC1_CH6
- ADC1_CH7


### PWM Output pins

The ESP32 LED PWM controller has 16 independent channels that can be configured to generate PWM signals with different properties. All pins that can act as outputs can be used as PWM pins (Input only pin GPIOs 34 to 39 can’t generate PWM).


### Capacitive touch GPIOs

- T0 (GPIO 4)
- T1 (GPIO 0)
- T2 (GPIO 2)
- T3 (GPIO 15)
- T4 (GPIO 13)
- T5 (GPIO 12)
- T6 (GPIO 14)
- T7 (GPIO 27)
- T8 (GPIO 33)
- T9 (GPIO 32)


### Digital to Analog Converter (DAC) Pins

- DAC1 (GPIO25)
- DAC2 (GPIO26)


### RTC GPIOs

- RTC_GPIO0 (GPIO36)
- RTC_GPIO3 (GPIO39)
- RTC_GPIO4 (GPIO34)
- RTC_GPIO5 (GPIO35)
- RTC_GPIO6 (GPIO25)
- RTC_GPIO7 (GPIO26)
- RTC_GPIO8 (GPIO33)
- RTC_GPIO9 (GPIO32)
- RTC_GPIO10 (GPIO4)
- RTC_GPIO11 (GPIO0)
- RTC_GPIO12 (GPIO2)
- RTC_GPIO13 (GPIO15)
- RTC_GPIO14 (GPIO13)
- RTC_GPIO15 (GPIO12)
- RTC_GPIO16 (GPIO14)
- RTC_GPIO17 (GPIO27)


### Serial UART pins

First Serial RX0, TX0 is used for programming,

- GPIO3 (U0RXD)
- GPIO1(U0TXD)

Another Serial port is available on

- GPIO16 (U2RXD).
- GIIO17 (U2TXD).


### I2C Pins

- GPIO 21 (SDA)
- GPIO 22 (SCL)


### SPI pins

|SPI|MOSI|MISO|CLK|CS|
|---|----|----|---|---|
|VSPI|GPIO 23|GPIO 19|GPIO 18|GPIO 5|
|HSPI|GPIO 13|GPIO 12|GPIO 14|GPIO 1|


