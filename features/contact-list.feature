Feature: Lista de contatos
    As um usu�rio
    I want acessar e gerenciar lista de contatos
    So that posso manter e gerenciar uma lista atualizada

Scenario: Adi��o de Novo Contato na Lista
    Given o usu�rio est� na p�gina de "Lista de Contatos"
    When o usu�rio encontra e toca no bot�o de adi��o de novo contato
    Then uma nova tela de inser��o de informa��es do contato � apresentada
    And o usu�rio preenche manualmente as informa��es do novo contato
    when o usu�rio confirma a adi��o do novo contato
    Then o usu�rio � redirecionado de volta � p�gina de "Lista de Contatos"

Scenario: Informa��es do Contato
    Given o usu�rio est� na p�gina de "Lista de Contatos"
    And o usu�rio possui contatos na lista
    When o usu�rio clica no nome de um contato espec�fico
    Then uma nova tela � apresentada com as informa��es do contato selecionado
    And o usu�rio pode visualizar detalhes como nome, foto, status e outras informa��es relevantes
    And o usu�rio tem a op��o de iniciar uma conversa com o contato
    And ao selecionar a op��o de iniciar conversa, a tela de conversa � aberta