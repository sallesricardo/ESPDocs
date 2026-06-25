---
title: "Building"
layout: ../../../layouts/MainLayout.astro
index: 1
---

## Compilando

Antes de compilar o código, é preciso definir o target.

Para definir o target, basta executar o comando:
```bash
idf.py set-target <target>
```

Onde `<target>` é o target desejado.

Exemplo:
```bash
idf.py set-target esp32
```

> Para ver os targets disponíveis, execute o comando:
> ```bash
> idf.py --list-targets
> ```

Para mudar as configurações do build, basta executar o comando:
```bash
idf.py menuconfig
```

Para compilar o código, basta executar o comando:
```bash
idf.py build
```

Para limpar o build, basta executar o comando:
```bash
idf.py clean
```

As vezes é necessário uma limpeza mais completa, para isso temos o comando:
```bash
idf.py fullclean
```

Para gravar o binário, basta executar o comando:
```bash
idf.py flash
```
> O comando flash tem um parâmetro opcional que é a porta serial do ESP32.
> ```bash
> idf.py -p /dev/ttyUSB0 flash
> ```
