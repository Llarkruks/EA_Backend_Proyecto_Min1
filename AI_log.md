# AI_LOG.md

## Eina i model IA usats

- Eina: ChatGPT  
- Model: GPT-5.4 Thinking  

## Registre de consultes rellevants

| Pregunta | Prompt | Incoherències | Solució |
|---|---|---|---|
| Com afegir el nou tipus de questions al projecte | "Tinc un projecte amb users, routes i points. Ara he d’afegir questions. Com ho puc fer seguint la mateixa estructura?" | La resposta era bastant general i no tenia en compte exactament com tenia organitzat el meu projecte | Vaig mirar com estaven fets els altres models i rutes i vaig copiar l’estructura adaptant-la a questions |
| Com fer que el frontend suporti el nou tipus | "Com puc afegir un nou tipus a un DataService que ja funciona amb altres tipus?" | No tenia en compte parts concretes com la normalització o la configuració UI | Vaig anar afegint questions als tipus, al normalize i a la configuració manualment fins que funcionava igual que la resta |
| Problema mostrant les respostes | "Tinc un camp que és un array d’objectes i no es veu bé a la taula" | Proposava solucions més complexes del que necessitava | Vaig decidir no complicar-ho i mostrar primer el número d’answers i després el detall al desplegar la fila |
| Mostrar millor la informació al frontend | "Al frontend només veig IDs i no queda gaire clar" | Les respostes eren bastant genèriques | Vaig ajustar el DataTable perquè en el cas de questions es mostressin les respostes de forma més clara |
| Errors durant la integració | "He afegit un nou tipus però hi ha coses que no es mostren o no funcionen?" | Les respostes no estaven adaptades al meu codi | Vaig anar provant i revisant cada part (backend i frontend) fins trobar els errors i arreglar-los |

## Resum de l’ús de la IA

He utilitzat la IA per resoldre dubtes mentre anava fent el projecte. M’ha servit com a guia per saber per on anar quan havia d’afegir la nova funcionalitat de questions.

També m’ha ajudat en moments concrets quan alguna cosa no funcionava, sobretot al frontend, per entendre què podia estar fallant.

En general, la IA m’ha servit com a guia, però el codi final l’he revisat i adaptat manualment per encaixar amb la lògica i estructura del meu projecte.