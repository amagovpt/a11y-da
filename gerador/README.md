# gerador 21 / <em lang="en">Generator 21</em>

versão 2021 contém:
- (2019). versão FCUL baseada no estilo, estrutura e componente dinâmica da versão original desenvolvida no projeto WAI-Tools
- (2020). novo design concebido por AlfaMind para integração no acessibilidade.gov (formulário dividido por páginas)
- (2021). criada versão en-EN.

[português](#pt-PT) | [english](#en)

<div id="pt-PT" lang="pt-PT">

<abbr title="versão portuguesa">pt-PT</abbr>

 Gerador de Declarações de Acessibilidade e Usabilidade

## 1. Instalar Gerador 

Copiar todos os ficheiros, excepto os que estão dentro da pasta `servidor`, para o servidor Web que irá servir o Gerador.

No ficheiro `js/generator.js` atualizar a variável `fetchServer` para apontar para o endereço onde é disponibilizado o serviço de carregamento das declarações de acessibilidade a partir de um URL.

## 2. Instalar serviço "Carregar por URL"

Copiar o ficheiro `servidor/server.js` para o local onde será executado este serviço.

No ficheiro `servidor/server.js` configurar o valor das constantes:
- `hostname`: endereço do serviço (deve coincidir com o indicado em `fetchServer` no gerador)
- `port`: porto do serviço (deve coincidir com o indicado em `fetchServer` no gerador)
- `origin`: endereço (incluindo porto se for necessário) da máquina onde é disponibilizado o Gerador (de onde vêm os pedidos a este serviço)

### Executar serviço "Carregar por URL" 

Entrar na diretoria `/gerador/servidor/` e correr o comando:

```
node server.js &
disown
```

A primeira linha corre o serviço. A segunda permite manter o serviço a correr mesmo quando se sai do Terminal
 
</div>

---

<div id="en" lang="en">
 
 <abbr title="English version">EN</abbr>

Generator of Accessibility and Usability Statement

## 1. Install the Accessibility Statement Generator

Copy all the files, except those inside the `server` folder, to the Web server that will serve the Generator.

In the `js / generator.js` file, update the` fetchServer` variable to point to the address where the accessibility statement loading service is available from a URL.

## 2. Install the service "Upload by URL"

Copy the file `server / server.js` to the location where this service will be executed.

In the `server / server.js` file set the value of the constants:
- `hostname`: service address (must match the one indicated in` fetchServer` in the generator)
- `port`: service port (must match the one indicated in` fetchServer` in the generator)
- `origin`: address (including port if necessary) of the machine where the Generator is made available (where requests for this service come from)

### Run the service that allow "Upload by URL"
 
Enter in the directory `/gerador/servidor/` and run the command:

```
node server.js &
disown
```

The first command runs the service. The second allows the service to stay running after leaving the Terminal.
</div>
 
