<!--
*** Thanks for checking out the Best-README-Template. If you have a suggestion
*** that would make this better, please fork the repo and create a pull request
*** or simply open an issue with the tag "enhancement".
*** Thanks again! Now go create something AMAZING! :D
-->



<!-- PROJECT SHIELDS -->
<!--
*** I'm using markdown "reference style" links for readability.
*** Reference links are enclosed in brackets [ ] instead of parentheses ( ).
*** See the bottom of this document for the declaration of the reference variables
*** for contributors-url, forks-url, etc. This is an optional, concise syntax you may use.
*** https://www.markdownguide.org/basic-syntax/#reference-style-links
-->
[![Contributors][contributors-shield]][contributors-url]
[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]
[![MIT License][license-shield]][license-url]
[![LinkedIn][linkedin-shield]][linkedin-url]



<!-- PROJECT LOGO -->
<br />
<p align="center">
  <a href="#">
    <img src="images/logo.png" alt="Logo">
  </a>

  <h3 align="center">PagSeguro Integrado ao Framework CodeIgniter</h3>

  <p align="center">
    Inicie o seu Projeto já com a integração do PagSeguro Feita
    <br />
    <a href="https://github.com/othneildrew/Best-README-Template"><strong>Explore a documentação »</strong></a>
    <br />
    <br />
    ·
    <a href="https://github.com/othneildrew/Best-README-Template/issues">Peça uma Feature</a>
  </p>
</p>



<!-- TABLE OF CONTENTS -->
<details open="open">
  <summary>Informações do Projeto</summary>
  <ol>
    <li>
      <a href="#about-the-project">Sobre o Projeto</a>
      <ul>
        <li><a href="#built-with">Criado com as Techs</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Iniciando</a>
      <ul>
        <li><a href="#prerequisites">Pre-requisitos</a></li>
        <li><a href="#installation">Instalação</a></li>
      </ul>
    </li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#roadmap">Roadmap</a></li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#contact">Contact</a></li>
    <li><a href="#acknowledgements">Acknowledgements</a></li>
  </ol>
</details>



<!-- ABOUT THE PROJECT -->
## About The Project

[![Product Name Screen Shot][product-screenshot]](https://example.com)

Esta integração do CodeIgniter foi criada para facilitar a inicialização de um projeto, o Processo de integração ao PagSeguro sempre é demorada portanto criei este projeto no GitHub para o meu uso pessoal & para as pessoas que desejam economizar no tempo de desenvolvimento de algo novo.

Benefícios:
* Código funcional & seguro.
* Ecomize tempo no desenvolvimento.
* 100% Integrado ao PagSeguro modo SandBox & Produção :smile:
* Tela de Pagamento já desenvolvida.


### Criado com:

* [Bootstrap](https://getbootstrap.com)
* [JQuery](https://jquery.com)
* [CodeIgniter](https://codeigniter.com)



<!-- GETTING STARTED -->
## Iniciando

Confira este tutorial para começar o seu projeto com a integração do PagSeguro

### Pre-Requisitos

É Necessário você ter sua conta no PagSeguro & com suas credências em mãos.

A Ativação, E-mail & Token são os primeiros passos para tornar a sua integração funcional. Após se cadastrar e formalizar a contratação do serviço junto ao PagSeguro, você receberá um Token que será utilizado para referenciar a sua conta e validar os pagamentos processados.

* Acesse a sua conta PagSeguro;
* No menu lateral, selecione Venda online; 
* Vá na opção Integrações;
* E pressione o botão Gerar Token.

Caso você já tenha gerado o token anteriormente, ele será enviado ao seu e-mail de cadastro por segurança. Nesse caso, basta pressionar Enviar por e-mail. Se preferir, você também pode gerar um novo token, mas importante: nesse caso, o token antigo deixará de funcionar.


### Instalação

1. Tenha em mãos o seu token do [https://acesso.pagseguro.uol.com.br/](PagSeguro)
2. Clone o repositório
   ```sh
   git clone https://github.com/Luan1Schons/Pagseguro-CodeIgniter.git
   ```
3. Preencha a sua AP]I em `application/config/payment.php`

<!-- language: php -->
  $config['pagseguro'] = array(
    'production' => false,
    'url_production' => 'https://ws.pagseguro.uol.com.br/v2',
    'url_sandbox' => 'https://ws.sandbox.pagseguro.uol.com.br/v2',
    // <--- Tokens -->
    'token_production' => 'your production token',
    'token_sandbox' => 'your sandbox token',
    // <!--- Tokens -->
    'payment' => 'pagseguro',
    'version' => $config['version']
);

  



<!-- USAGE EXAMPLES -->
## Utilização

Utilize este projeto para criar sistemas que dependam de um meio de pagamento seguro.


<!-- CONTRIBUTING -->
## Contribuição

As contribuições são o que tornam a comunidade de código aberto um lugar incrível para aprender, inspirar e criar. Quaisquer contribuições que você fizer ficarei **muito apreciado**.

1. Crie um fork do projeto
2. Crie o seu Branch de Feature (`git checkout -b feature/AmazingFeature`)
3. Commita suas alterações (`git commit -m 'Add some AmazingFeature'`)
4. Push para a Branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request



<!-- LICENSE -->
## Lisença


Distribuído sob a licença MIT. Ver `LISENÇA` para mais informações.



<!-- CONTACT -->
## Contact

Luan Schons Griebler - [@theluanschons](https://instagram.com/theluanschons) - luanschons2000@gmail.com


<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->
[contributors-shield]: https://img.shields.io/github/contributors/othneildrew/Best-README-Template.svg?style=for-the-badge
[contributors-url]: https://github.com/othneildrew/Best-README-Template/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/othneildrew/Best-README-Template.svg?style=for-the-badge
[forks-url]: https://github.com/othneildrew/Best-README-Template/network/members
[stars-shield]: https://img.shields.io/github/stars/othneildrew/Best-README-Template.svg?style=for-the-badge
[stars-url]: https://github.com/othneildrew/Best-README-Template/stargazers
[issues-shield]: https://img.shields.io/github/issues/othneildrew/Best-README-Template.svg?style=for-the-badge
[issues-url]: https://github.com/othneildrew/Best-README-Template/issues
[license-shield]: https://img.shields.io/github/license/othneildrew/Best-README-Template.svg?style=for-the-badge
[license-url]: https://github.com/othneildrew/Best-README-Template/blob/master/LICENSE.txt
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[linkedin-url]: https://linkedin.com/in/othneildrew
[product-screenshot]: images/screenshot.png