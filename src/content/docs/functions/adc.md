---
title: ADC
---

:::caution
Ao utilizar Wi-Fi, não é possivel utilizar o ADC2.
:::

O ESP32 tem 2 drivers de modo de leitura de dados analógicos:
- One-Shot
- Continuous

## Conversão ADC

O ESP32 possui um ADC de 12 bits, possibilitando 4096 valores possíveis.

A voltagem é calculada pela seguinte fórmula:

```math
Vdata = (data / (2^bitwidth - 1)) * Vref
```

Onde:
- `data`: valor lido do ADC
- `bitwidth`: tamanho do ADC (12 bits)
- `Vref`: referência voltagem do ADC

> Por padrão Vref é 1100mV. No durante a fabricação esse valor pode variar entre 1000mV e 1200mV.

## Atenuação de voltagem

Para leitura de voltagens maiores que Vref, é necessário atenuar a voltagem.

Os valores possíveis para atenuação são:

- 0dB (k = 100%)
- 2,5dB (k = 75%)
- 6dB (k = 50%)
- 12dB (k = 25%)

A voltagem atenuada é calculada pela seguinte fórmula:

```math
Vdata = (data / (2^bitwidth - 1)) * (Vref / k)
```

Onde:
- `k` é a proporção de atenuação

## Uso do Driver de ADC

- A unidade ADC suporta o modo One-Shot, nesse modo o ADC captura uma amostra por canal por vez.
- Cada unidade ADC suporta o modo Continuous, nesse modo o ADC capura sequencialmente as amostras de um grupo de canais ou um unico canal.


## Referência da API

- [ADC API](https://docs.espressif.com/projects/esp-idf/en/latest/esp32/api-reference/peripherals/adc.html)

### Header Canais

```c
#include "soc/adc_channel.h"
```

#### Macros

- ADC1_GPIO36_CHANNEL
- ADC1_CHANNEL_0_GPIO_NUM
- ADC1_GPIO37_CHANNEL
- ADC1_CHANNEL_1_GPIO_NUM
- ADC1_GPIO38_CHANNEL
- ADC1_CHANNEL_2_GPIO_NUM
- ADC1_GPIO39_CHANNEL
- ADC1_CHANNEL_3_GPIO_NUM
- ADC1_GPIO32_CHANNEL
- ADC1_CHANNEL_4_GPIO_NUM
- ADC1_GPIO33_CHANNEL
- ADC1_CHANNEL_5_GPIO_NUM
- ADC1_GPIO34_CHANNEL
- ADC1_CHANNEL_6_GPIO_NUM
- ADC1_GPIO35_CHANNEL
- ADC1_CHANNEL_7_GPIO_NUM
- ADC2_GPIO4_CHANNEL
- ADC2_CHANNEL_0_GPIO_NUM
- ADC2_GPIO0_CHANNEL
- ADC2_CHANNEL_1_GPIO_NUM
- ADC2_GPIO2_CHANNEL
- ADC2_CHANNEL_2_GPIO_NUM
- ADC2_GPIO15_CHANNEL
- ADC2_CHANNEL_3_GPIO_NUM
- ADC2_GPIO13_CHANNEL
- ADC2_CHANNEL_4_GPIO_NUM
- ADC2_GPIO12_CHANNEL
- ADC2_CHANNEL_5_GPIO_NUM
- ADC2_GPIO14_CHANNEL
- ADC2_CHANNEL_6_GPIO_NUM
- ADC2_GPIO27_CHANNEL
- ADC2_CHANNEL_7_GPIO_NUM
- ADC2_GPIO25_CHANNEL
- ADC2_CHANNEL_8_GPIO_NUM
- ADC2_GPIO26_CHANNEL
- ADC2_CHANNEL_9_GPIO_NUM

### Header de tipos

```c
#include "hal/adc_types.h"
```

#### Estruturas

```c
struct adc_digi_pattern_config_t {
    uint8_t atten;       /*!< Attenuation of ADC */
    uint8_t channel;     /*!< Channel of ADC */
    uint8_t unit;        /*!< Unit of ADC */
    uint8_t bitwidth;    /*!< Bitwidth of ADC */
};
```
#### Definições de tipos

```c
typedef soc_periph_adc_rtc_clk_src_t adc_oneshot_clk_src_t;
```
> Fonte de clock para one-shot mode usando controlador RTC

```c
typedef soc_periph_adc_digi_clk_src_t adc_continuous_clk_src_t;
```

> Fonte de clock para continuous mode usando controlador digital


### Enumerações

```c
/**
 * @brief ADC unit
 */
typedef enum {
    ADC_UNIT_1,        ///< SAR ADC 1
    ADC_UNIT_2,        ///< SAR ADC 2
} adc_unit_t;

/**
 * @brief ADC channels
 */
typedef enum {
    ADC_CHANNEL_0,     ///< ADC channel
    ADC_CHANNEL_1,     ///< ADC channel
    ADC_CHANNEL_2,     ///< ADC channel
    ADC_CHANNEL_3,     ///< ADC channel
    ADC_CHANNEL_4,     ///< ADC channel
    ADC_CHANNEL_5,     ///< ADC channel
    ADC_CHANNEL_6,     ///< ADC channel
    ADC_CHANNEL_7,     ///< ADC channel
    ADC_CHANNEL_8,     ///< ADC channel
    ADC_CHANNEL_9,     ///< ADC channel
    ADC_CHANNEL_10,    ///< ADC channel
} adc_channel_t;

/**
 * @brief ADC attenuation parameter. Different parameters determine the range of the ADC.
 */
typedef enum {
    ADC_ATTEN_DB_0   = 0,  ///<No input attenuation, ADC can measure up to approx.
    ADC_ATTEN_DB_2_5 = 1,  ///<The input voltage of ADC will be attenuated extending the range of measurement by about 2.5 dB
    ADC_ATTEN_DB_6   = 2,  ///<The input voltage of ADC will be attenuated extending the range of measurement by about 6 dB
    ADC_ATTEN_DB_12  = 3,  ///<The input voltage of ADC will be attenuated extending the range of measurement by about 12 dB
} adc_atten_t;

/**
 * @brief ADC bitwidth
 */
typedef enum {
    ADC_BITWIDTH_DEFAULT = 0, ///< Default ADC output bits, max supported width will be selected
    ADC_BITWIDTH_9  = 9,      ///< ADC output width is 9Bit
    ADC_BITWIDTH_10 = 10,     ///< ADC output width is 10Bit
    ADC_BITWIDTH_11 = 11,     ///< ADC output width is 11Bit
    ADC_BITWIDTH_12 = 12,     ///< ADC output width is 12Bit
    ADC_BITWIDTH_13 = 13,     ///< ADC output width is 13Bit
} adc_bitwidth_t;

/**
 * @brief ADC ULP working mode
 *
 * This decides the controller that controls ADC when in low power mode.
 * Set `ADC_ULP_MODE_DISABLE` for normal mode.
 */
typedef enum {
    ADC_ULP_MODE_DISABLE = 0, ///< ADC ULP mode is disabled
    ADC_ULP_MODE_FSM     = 1, ///< ADC is controlled by ULP FSM
    ADC_ULP_MODE_RISCV   = 2, ///< ADC is controlled by ULP RISCV
#if SOC_LP_ADC_SUPPORTED
    ADC_ULP_MODE_LP_CORE = 3, ///< ADC is controlled by LP Core
#endif // SOC_LP_ADC_SUPPORTED
} adc_ulp_mode_t;

/**
 * @brief ADC digital controller (DMA mode) work mode.
 */
typedef enum {
    ADC_CONV_SINGLE_UNIT_1 = 1,  ///< Only use ADC1 for conversion
    ADC_CONV_SINGLE_UNIT_2 = 2,  ///< Only use ADC2 for conversion
    ADC_CONV_BOTH_UNIT     = 3,  ///< Use Both ADC1 and ADC2 for conversion simultaneously
    ADC_CONV_ALTER_UNIT    = 7,  ///< Use both ADC1 and ADC2 for conversion by turn. e.g. ADC1 -> ADC2 -> ADC1 -> ADC2 .....
} adc_digi_convert_mode_t;

/**
 * @brief ADC digital controller (DMA mode) output data format option.
 */
typedef enum {
    ADC_DIGI_OUTPUT_FORMAT_TYPE1,   ///< See `adc_digi_output_data_t.type1`
    ADC_DIGI_OUTPUT_FORMAT_TYPE2,   ///< See `adc_digi_output_data_t.type2`
} adc_digi_output_format_t;

/**
 * @brief ADC IIR Filter ID
 */
typedef enum {
    ADC_DIGI_IIR_FILTER_0,  ///< Filter 0
    ADC_DIGI_IIR_FILTER_1,  ///< Filter 1
} adc_digi_iir_filter_t;

/**
 * @brief IIR Filter Coefficient
 */
typedef enum {
    ADC_DIGI_IIR_FILTER_COEFF_2,     ///< The filter coefficient is 2
    ADC_DIGI_IIR_FILTER_COEFF_4,     ///< The filter coefficient is 4
    ADC_DIGI_IIR_FILTER_COEFF_8,     ///< The filter coefficient is 8
    ADC_DIGI_IIR_FILTER_COEFF_16,    ///< The filter coefficient is 16
    ADC_DIGI_IIR_FILTER_COEFF_32,    ///< The filter coefficient is 32
    ADC_DIGI_IIR_FILTER_COEFF_64,    ///< The filter coefficient is 64
} adc_digi_iir_filter_coeff_t;

/**
 * @brief ADC monitor (continuous mode) ID
 */
typedef enum {
    ADC_MONITOR_0,          ///< The monitor index 0.
    ADC_MONITOR_1,          ///< The monitor index 1.
} adc_monitor_id_t;

/**
 * @brief Monitor config/event mode type
 */
typedef enum {
    ADC_MONITOR_MODE_HIGH = 0,      ///< ADC raw_result > threshold value, monitor interrupt will be generated.
    ADC_MONITOR_MODE_LOW,           ///< ADC raw_result < threshold value, monitor interrupt will be generated.
} adc_monitor_mode_t;

```

## One-Shot mode

[Referência da API](https://docs.espressif.com/projects/esp-idf/en/v6.0.1/esp32/api-reference/peripherals/adc/adc_oneshot.html)

O modo One-Shot foi desenvolvido para aplicações que requerem a leitura infrequente ou disparada de amostragem.

### Header

```c
#include "esp_adc/adc_oneshot.h"
```

### Preparação

Primeiro set a estrutura de configuração inicial `adc_oneshot_unit_unit_cfg_t`:

#### Criando um handler para o ADC em modo One-Shot Normal

```c
adc_oneshot_unit_handle_t adc1_handle;
adc_oneshot_unit_init_cfg_t init_config1 = {
    .unit_id = ADC_UNIT_1,
    .ulp_mode = ADC_ULP_MODE_DISABLE,
};
ESP_ERROR_CHECK(adc_oneshot_new_unit(&init_config1, &adc1_handle));
```

#### Reciclando a unidade ADC

```c
ESP_ERROR_CHECK(adc_oneshot_del_unit(adc1_handle));
```

#### Configurando o ADC

Depois de criada a instância da unidade, é preciso configurar o ADC.

```c
adc_oneshot_chan_cfg_t config = {
    .atten = ADC_ATTEN_DB_0,
    .bitwidth = ADC_BITWIDTH_DEFAULT,
};

// é possivel configurar mais de um canal
ESP_ERROR_CHECK(adc_oneshot_config_channel(adc1_handle, EXAMPLE_ADC1_CHAN0, &config));
ESP_ERROR_CHECK(adc_oneshot_config_channel(adc1_handle, EXAMPLE_ADC1_CHAN1, &config));
```

### Lendo o valor do ADC

Para ler o valor dos ADCs configurados basta chamar a funcão `adc_oneshot_read()`.
> A função `adc_oneshot_read()` retorna o valor lido do ADC.
> A funçaõ `adc_oneshot_read()` pode falahr caso o ADC esteja em uso por outro driver/periférico retornando `ESP_ERR_TIMEOUT`.
> A função `adc_oneshot_read()` não pode ser usada em interrupções.

O valor retornado por essa função é o valor raw lido do ADC. Para calcular o tensão é preciso fazer o calculo:

```math
Vout = Dout * (Vmax / 2^bitwidth)
```

Onde:
- `Dout`: valor lido do ADC
- `Vmax`: valor máximo do ADC
- `bitwidth`: tamanho em bits do ADC

### Resultado Raw

```c
ESP_ERROR_CHECK(adc_oneshot_read(adc1_handle, EXAMPLE_ADC1_CHAN0, &adc_raw[0][0]));
ESP_LOGI(TAG, "ADC%d Channel[%d] Raw Data: %d", ADC_UNIT_1 + 1, EXAMPLE_ADC1_CHAN0, adc_raw[0][0]);

ESP_ERROR_CHECK(adc_oneshot_read(adc1_handle, EXAMPLE_ADC1_CHAN1, &adc_raw[0][1]));
ESP_LOGI(TAG, "ADC%d Channel[%d] Raw Data: %d", ADC_UNIT_1 + 1, EXAMPLE_ADC1_CHAN1, adc_raw[0][1]);
```
