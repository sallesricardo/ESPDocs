---
title: Tasks
layout: ../../../layouts/MainLayout.astro
---

# Tasks

Task é uma tarefa de execução em paralelo.

## Criando uma task

Importe basico do FreeRTOS:
```c
#include <stdio.h>
#include <freertos/FreeRTOS.h>
#include <freertos/task.h>

```

Exemplo de task:
```c
void vTask1( void *pvParameters )
{
    while( 1 ) {
        printf( "Hello from task 1\n" );
        vTaskDelay( 1000 / portTICK_PERIOD_MS );
    }
}
```

No app_main.c, crie a task:
```c
void app_main( void )
{
    xTaskCreate(
        vTask1,
        "Task 1",
        1024,
        NULL,
        1,
        NULL
    );
}
```

Parametros do função xTaskCreate:
```c
BaseType_t xTaskCreate(
    TaskFunction_t pvTaskCode,      // A função da task
    const char * const pcName,      // Nome da task
    configSTACK_DEPTH_TYPE usStackDepth, // Tamanho da pilha
    void * const pvParameters,      // Parâmetros da task
    UBaseType_t uxPriority,         // Prioridade
    TaskHandle_t * const pvCreatedTask // Handle (identificador)
);
```

- pvTaskCode: A função da Task
- pcName: Nome da Task
- usStackDepth: Tamanho da pilha da Task
- pvParameters: Parâmetros da Task
- uxPriority: Prioridade da Task
- pvCreatedTask: Handle da Task

## Criando uma task com parâmetros

Definir uma struct para armazenar os parâmetros:
```c
typedef struct {
    int a;
    int b;
} my_params_t;
```

Criar a task:
pvParameters é um ponteiro para a struct my_params_t, mas é preciso fazer cast.
```c
void vTask1( void *pvParameters )
{
    my_params_t *params = (my_params_t *)pvParameters;
    printf( "Hello from task 1, a = %d, b = %d\n", params->a, params->b );
    vTaskDelay( 1000 / portTICK_PERIOD_MS );
}
```

No app_main.c, crie a task:

```c
void app_main( void )
{
    my_params_t *params = malloc( sizeof( my_params_t ) );
    params->a = 1;
    params->b = 2;
    xTaskCreate(
        vTask1,
        "Task 1",
        1024,
        (void *)params,
        1,
        NULL
    );
};
```


## Definindo o tamanho da pilha da Task

O tamanho da pilha da task é definido pelo parâmetro usStackDepth.
O tamanho da pilha pode variar e é composo por:
- Variaveis locais
- Contexto de CPU (usado pelo scheduler ao alternar entre tarefas)
- Bibliotecas usadas pela task

O ESP-IDF possui uma função para calcular o tamanho da pilha:
`uxTaskGetStackHighWaterMark`

Exemplo:
```c
void task_minha_logica(void *pvParameters) {
    while(1) {
        // ... toda a lógica pesada da task ...

        // Mede o espaço SOBRANDO (em words de 4 bytes)
        UBaseType_t watermark_words = uxTaskGetStackHighWaterMark(NULL);

        // Converte para bytes para facilitar a leitura
        uint32_t sobrando_bytes = watermark_words;

        ESP_LOGI("STACK", "Ainda me restam %d bytes de stack livres!", sobrando_bytes);

        // vTaskDelay(pdMS_TO_TICKS(5000));
    }
}
```

Acompanhe a execução da task por um tempo e veja o quanto de stack livre ela está usando.
Se possivel, simule a pior condição possível e veja o quanto de stack livre ela está usando.
