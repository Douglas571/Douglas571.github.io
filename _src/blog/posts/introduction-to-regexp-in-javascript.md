---
    title: Introducción al Uso de Expresiones Regulares en Javascript
    content-tags:
        - RegExp
        - Javascript

    author: Douglas Socorro
    date: 2021-09-19

    tags: posts
    layout: post
---

# {{title}}

## Contenido
1. [Expresiones Regulares](#expresiones-regulares)
2. [Usos](#usos)
3. [Declaración](#declaracion)
4. [Validando Datos](#validando-datos)
5. [Extrayendo Sub-cadenas](#extrayendo-sub-cadenas)
6. [Modificando Cadenas](#modificando-cadenas)
7. [Resumen](#resumen)

8. [Referencias](#referencias)

<h2 id="expresiones-regulares">Expresiones Regulares</h2>

Las expresiones regulares, regexp o regex del inglés (Regular Expressions), son un método usado para describir un patrón de caracteres, que luego serán identificados en una cadena de texto.

Conforman un lenguaje propio, agnóstico a cualquier lenguaje de programación, y algunos editores de texto lo incorporan en sus herramientas de búsqueda. Por ejemplo: Sublime Text, Visual Studio, el comando grep, entre otros.

<h2 id="usos">Usos</h2>

Las expresiones regulares son al programador, lo que una motosierra a un leñador. Si dominas su lenguaje, este te permite extraer y modificar cadenas de texto de una forma rápida y limpia, eliminando incansables bucles, condicionales y llamadas a los métodos split y join.

De igual forma, en Javascript las expresiones regulares son ampliamente utilizadas para el procesamiento y validación de datos: Emails, nombres de usuario, contraseñas, direcciones, etc.

<h2 id="declaracion">Declarión</h2>

Las expresiones regulares en javascript son objetos del tipo RegExp, y pueden ser declaradas mediante literales encerradas entre barras /…/ o por el constructor.

```javascript
//Con literales de RegExp
const withLiteral = /abc/ig

//Con constructor de RegExp
const y = 'y'
const withConstructor = RegExp('x'+ y +'z', 'ig')
```

Las literales pueden ser declaradas con un bandera, que modifica el comportamiento, la i establece que ha de ignorarse si los caracteres estan es mayusculas o minusculas; la g o bandera global, establece que se han de buscar emparejamientos en toda la cadena.

### Escapando Caracteres

Algunos caracteres, poseen un significado especial en expresiones regulares, por ejemplo: el signo + es un cuantificador, si queremos buscar una cadena que contenga este signo es necesario escaparla usando la barra invertida /\+/.

Utilizando literales no hay mayor inconveniente, sin embargo, el constructor de RegExp, recibe como parámetro una cadena de texto, y en este caso, la barra invertida ya tiene un significado especial de por sí, por lo tanto, hay que escaparlo, el ejemplo anterior quedaría así: “\\+”.

De esta forma, vemos que las literales nos ahorran hacer un doble escapado, a costa de ser estáticas, el método del constructor nos permite generar expresiones regulares de forma dinámica.

### Referencias

En el sitio web de microsoft para developers puedes revisar una [pequeña referencia](https://docs.microsoft.com/en-us/dotnet/standard/base-types/regular-expression-language-quick-reference) sobre los caracteres expeciales de las expresiones regulares.

Si necesitas algo más detallado, tambien puedes revisar la documentación en Mozila Developer Network(MDN) sobre [expresiones regulares](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions).

<h2 id="validando-datos">Validando Datos</h2>

La clase RegExp posee el método **[test](https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/RegExp/test)** al cual se le pasa por parámetro una cadena de texto, y comprueba si se ajusta a la expresión regular utilizada.

```javascript
const phone = '0412-051-34-32'
const phonePattern = /\d{4}-\d{3}-\d{2}-\d{2}/

if(phonePattern.test(phone)) {
    console.log(`${phone} is a valid phone number`)

} else {
    console.log(`${phone} is an invalid phone number`)
}

//Expected output: 0412-051-34-32 is a valid phone
```

En el lenguaje de las expresiones regulares, el carácter \d sirve para identificar un digito, si se le une al cuantificador {n}, donde n es 4, establece que la expresión debe identificar 4 caracteres de tipo digito.

Por otro lado, la clase String proporciona el método **[search](https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/String/search)** que devuelve el índice del primer emparejamiento en la cadena, o -1 en caso de no existir.

```javascript
let index = phone.search(phonePattern)
if(index != -1) {
    console.log(`${phone} is a valid phone number in position: ${index}`)

} else {
    console.log(`${phone} is an invalid phone number`)
}
//Expected output: 0412-051-34-32 is a valid phone number in position: 0
```

<h2 id="extrayendo-sub-cadenas">Extrayendo Subcadenas</h2>

Como ya he mencionado, un uso bastante potente de las expresiones regulares es la capacidad de extraer sub-cadenas de texto. Se puede hacer de distintas formas, pero las más seguras son mediante los métodos **[match](https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/String/match)** y **[matchAll](https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/String/match)** de la clase String.

### Usando .match()

El uso de la bandera g en la expresión regular cambia el comportamiento de match, al estar ausente, devuelve una arreglo el cual actua como una descripción detallada del emparejamiento encontrado: en la primera posicicón, el emparejamiento completo, seguido de los grupos de captura, e incluye un objeto index que informa de la posición en la cadena de texto.

*Grupos de Captura: Son definidos mediantes paréntesis en las expresiones regulares, se comportan como sub-expresiones y es posible acceder a ellos individualmente.*

```javascript
let screenSize = "el tamaño de la pantalla es 780x1024"
let screenSizePattern = /(\d{3,})x(\d{3,})/i

let detallesDelEmparejamiento = screenSize.match(screenSizePattern)
let [emparejamientoCompleto, alto, ancho] = detallesDelEmparejamiento

console.log('el ancho es: ' + ancho + 'px\nel alto es: ' + alto + 'px')
```

Cuando la bandera g está presente, el metodo **match** retorna un array con todos los emparejamientos encontrados, ignorando los grupos de captura.

```javascript
let multipleScreens = '780x1024\n3000x2000\n640x860\n1024x2000\n'
let screenSizePatternGlobal = /(\d{3,})x(\d{3,})/ig

console.log(multipleScreens.match(screenSizePatternGlobal))
//expected output: ["780x1024", "3000x2000", "640x860", "1024x2000"]
```

### Usando .matchAll()

A veces deseamos un resultado más detallado, y para ello recurrimos a matchAll, el cual retorna un **[iterador](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Iterators_and_Generators)** con todos los emparejamientos de la cadena; cada elemento del iterador es un objeto similar al retornado por match sin la bandera global.

Debido a que retorna un iterado, es muy práctico de utilizar con el bucle for-of, Array spread y Array.from().

```javascript
//Con for-of
for (const match of multipleScreens.matchAll(screenSizePatternGlobal)) {
    console.log(`match: ${match[0]}, 
                ancho: ${match[1]}, 
                alto: ${match[2]}, 
                start: ${match.index}, 
                end: ${match.index + match[0].length}`)
}

//Usando Array Spread
let matches = [...multipleScreens.matchAll(screenSizePatternGlobal)]

//Creando un array
let arrayOfMatches = Array.from(multipleScreens.matchAll(screenSizePatternGlobal), m => m[0])
```

Cabe señalar que matchAll acepta únicamente expresiones regulares con la bandera global, de lo contrario lanza una excepción.

Estos dos métodos están implementados alrededor del método **[exec](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp/exec)** de la clase RegExp, el cual es un poco confuso y es preferible evitarlo, en pro de match y matchAll.

<h2 id="modificando-cadenas">Modificando Cadenas</h2>

Otro uso bastante potente para las expresiones regulares es la modificación de textos con **[replace](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/replace)**; el lenguaje de las expresiones regulares establece una sintaxis en estos casos.

Podemos establecer cómo debe de quedar la porción de cadena emparejada, pasando como segundo parámetro una cadena de texto, y mediante el signo $ podemos formatear la nueva cadena: $& hará referencia a la cadena completa y con $1, ..., $9 accederemos a los grupos de captura definidos en la expresión regular.

```javascript
let names = "Liskov, Barbara\nMcCarthy, John\nWadler, Philip".replace(/(\w+), (\w+)/g, "$& -> $2 $1")

console.log(names);
// Expected output:
// Liskov, Barbara -> Barbara Liskov
// McCarthy, John -> John McCarthy
// Wadler, Philip -> Philip Wadler
```

Así mismo, también es posible pasar una función como segundo parámetro de replace, esta ha de recibir como primer parámetro, el match completo, seguido de los n grupos de captura que hayamos especificado en nuestra expresión regular.

La función pasada a replace, será llamada con cada uno de los emparejamientos, y se debe retornar algún valor que será colocado en su lugar.

```javascript
let title = 'Artist1 - Some Song Title (ft. Artist2, Artist3)'
let regexp = /(\w+) - (.+) \(ft\. (.+)\)/i

title = title.replace(regexp, (_, artist, song, fts) => `${song} by ${artist} & ${fts}`)

console.log(title)
//Expected output: Some Song Title by Artist1 & Artist2, Artist3
```

<h2 id="resumen">Resumen</h2>

En este artículo hemos descubierto qué son las expresiones regulares, sus usos, así como las formas de emplearlas en el lenguaje javascript: Validación de datos, extracción de emparejamientos, así como el formateo de cadenas.

<h2 id="referencias">Referencias</h2>


- [MSDN - Regular Expression Language - Quick Reference](https://docs.microsoft.com/en-us/dotnet/standard/base-types/regular-expression-language-quick-reference)

- [MDN - Guía de Expresiones Regulares](https://developer.mozilla.org/es/docs/Web/JavaScript/Guide/Regular_Expressions)

- [Wikipedia - Expresiones Regulares](https://es.wikipedia.org/wiki/Expresi%C3%B3n_regular)

- [Eloquent Javascript - Regular Expressions](https://eloquentjavascript.net/09_regexp.html)
