# Demo sencilla: GitHub Copilot Free en Visual Studio Code

## Objetivo

Mostrar, en una demo corta y práctica, cómo usar **GitHub Copilot Free en Visual Studio Code** para acelerar tareas comunes de desarrollo.

La demo cubre:

- Sugerencias insertadas / ghost text.
- Copilot Chat en modo Ask.
- Inline Chat.
- Quick Chat.
- Agent mode, si está disponible.
- Smart Actions: Explain y Review.
- Generación de pruebas unitarias simples.
- Buenas prácticas de contexto y revisión.

> Nota: Copilot Free permite probar capacidades de Copilot sin costo, pero tiene límites de uso. Si durante la demo se alcanza el límite, puedes continuar explicando el flujo con los ejemplos preparados.

---

## Requisitos previos

En tu máquina ya tienes lo necesario:

- Visual Studio Code.
- Git.
- Python.
- .NET 9 SDK.
- Cuenta de GitHub con GitHub Copilot Free habilitado.
- Extensiones recomendadas en VS Code:
  - C# Dev Kit.
  - Python, opcional para una segunda demo.
  - GitHub Copilot / Copilot Chat, si no aparece integrado en tu versión de VS Code.

---

## Escenario de la demo

Vamos a crear una aplicación de consola en .NET para una biblioteca.

La aplicación permitirá:

1. Mostrar libros disponibles.
2. Buscar libros por título.
3. Pedir a Copilot que explique el código.
4. Refactorizar código usando Inline Chat.
5. Revisar código usando Smart Actions.
6. Generar pruebas unitarias simples.

Este escenario conecta bien con el curso porque simula una solución rápida para ayudar a una biblioteca pública a recuperar operaciones básicas.

---

# Parte 1 — Crear el proyecto base

## 1. Crear carpeta de trabajo

Abre una terminal en VS Code o en tu sistema operativo y ejecuta:

```bash
mkdir copilot-library-demo
cd copilot-library-demo
git init
```

## 2. Crear aplicación .NET 9

```bash
dotnet new console -n LibraryDemo
cd LibraryDemo
code .
```

## 3. Ejecutar la aplicación inicial

```bash
dotnet run
```

Resultado esperado:

```text
Hello, World!
```

---

# Parte 2 — Demo de sugerencias insertadas / Ghost Text

Abre el archivo `Program.cs` y reemplaza el contenido por esto:

```csharp
using System;

namespace LibraryDemo;

class Program
{
    static void Main(string[] args)
    {
        // Crear una lista de libros con título, autor y disponibilidad
        
    }
}
```

Coloca el cursor debajo del comentario y espera la sugerencia de Copilot.

## Qué mostrar

- Copilot usa el comentario como intención.
- La sugerencia aparece como texto gris o texto fantasma.
- Puedes aceptar la sugerencia con `Tab`.
- Puedes rechazarla con `Esc`.

## Qué decir

> Copilot no está escribiendo código de forma mágica. Está usando el contexto del archivo, el comentario y los patrones del código para sugerir una posible continuación. El desarrollador decide si acepta, cambia o rechaza la sugerencia.

---

# Parte 3 — Código base controlado para continuar la demo

Si Copilot no genera algo limpio o quieres mantener control del tiempo, reemplaza `Program.cs` con este código:

```csharp
using System;
using System.Collections.Generic;
using System.Linq;

namespace LibraryDemo;

public record Book(string Title, string Author, bool IsAvailable);

class Program
{
    static void Main(string[] args)
    {
        List<Book> books = new()
        {
            new Book("Clean Code", "Robert C. Martin", true),
            new Book("The Pragmatic Programmer", "Andrew Hunt", true),
            new Book("Domain-Driven Design", "Eric Evans", false),
            new Book("Design Patterns", "GoF", true)
        };

        Console.WriteLine("Library Demo");
        Console.WriteLine("Available books:");

        foreach (Book book in books.Where(b => b.IsAvailable))
        {
            Console.WriteLine($"- {book.Title} by {book.Author}");
        }
    }
}
```

Ejecuta:

```bash
dotnet run
```

Resultado esperado aproximado:

```text
Library Demo
Available books:
- Clean Code by Robert C. Martin
- The Pragmatic Programmer by Andrew Hunt
- Design Patterns by GoF
```

---

# Parte 4 — Copilot Chat en modo Ask

Abre Copilot Chat en VS Code.

Atajo común en Windows/Linux:

```text
Ctrl + Alt + I
```

En el chat, usa el modo **Ask** y escribe:

```text
Explain what this Program.cs file does in simple terms.
```

## Qué mostrar

- Copilot explica el archivo.
- No modifica el código automáticamente.
- Es útil para entender código heredado o código que no escribimos nosotros.

## Qué decir

> Ask es el modo más seguro para empezar. Sirve para preguntar, entender y pedir sugerencias sin que Copilot cambie los archivos directamente.

---

# Parte 5 — Demostrar la importancia del contexto

Primero pregunta en el chat:

```text
What does the Book record represent?
```

Luego selecciona esta línea en el editor:

```csharp
public record Book(string Title, string Author, bool IsAvailable);
```

Y vuelve a preguntar:

```text
Explain the selected code.
```

## Qué mostrar

- Con código seleccionado, Copilot responde mejor.
- El contexto mejora la precisión.

## Qué decir

> Mientras más contexto le damos a Copilot, mejor entiende la intención. El contexto puede venir del archivo abierto, código seleccionado, comentarios, nombres de funciones, archivos relacionados o historial del chat.

---

# Parte 6 — Inline Chat para refactorizar código

Selecciona este bloque:

```csharp
foreach (Book book in books.Where(b => b.IsAvailable))
{
    Console.WriteLine($"- {book.Title} by {book.Author}");
}
```

Abre Inline Chat:

```text
Ctrl + I
```

Escribe:

```text
Refactor this code into a separate method called DisplayAvailableBooks.
```

## Resultado esperado aproximado

Copilot debería sugerir algo parecido a:

```csharp
static void DisplayAvailableBooks(List<Book> books)
{
    Console.WriteLine("Available books:");

    foreach (Book book in books.Where(b => b.IsAvailable))
    {
        Console.WriteLine($"- {book.Title} by {book.Author}");
    }
}
```

Y en `Main`:

```csharp
DisplayAvailableBooks(books);
```

## Qué decir

> Inline Chat es perfecto para cambios pequeños y específicos. No necesito abrir una conversación larga; selecciono código, explico qué quiero y reviso la diferencia antes de aceptar.

---

# Parte 7 — Generar función desde un comentario

Debajo del método `DisplayAvailableBooks`, escribe este comentario:

```csharp
// Create a method that searches books by title and returns matching books
```

Espera la sugerencia de Copilot.

Si no aparece, empieza a escribir:

```csharp
static List<Book>
```

Copilot debería sugerir algo parecido a:

```csharp
static List<Book> SearchBooksByTitle(List<Book> books, string searchTerm)
{
    return books
        .Where(book => book.Title.Contains(searchTerm, StringComparison.OrdinalIgnoreCase))
        .ToList();
}
```

## Qué decir

> Este es uno de los patrones más útiles: escribir un comentario claro y dejar que Copilot proponga el código. Pero la sugerencia todavía debe revisarse; por ejemplo, aquí falta validar si `searchTerm` viene vacío o nulo.

---

# Parte 8 — Quick Chat para una mejora puntual

Abre Quick Chat:

```text
Ctrl + Shift + Alt + L
```

Pregunta:

```text
How can I make this search method safer if searchTerm is null or empty?
```

## Posible mejora

```csharp
static List<Book> SearchBooksByTitle(List<Book> books, string? searchTerm)
{
    if (string.IsNullOrWhiteSpace(searchTerm))
    {
        return new List<Book>();
    }

    return books
        .Where(book => book.Title.Contains(searchTerm, StringComparison.OrdinalIgnoreCase))
        .ToList();
}
```

## Qué decir

> Quick Chat sirve para preguntas rápidas sin romper el flujo de trabajo. Es útil para dudas pequeñas, errores, alternativas de implementación o validaciones puntuales.

---

# Parte 9 — Smart Action: Explain

Selecciona el método `SearchBooksByTitle`.

Haz clic derecho sobre el código seleccionado y busca:

```text
Copilot > Explain
```

## Qué mostrar

- Copilot genera una explicación sin que escribamos un prompt.
- Usa la selección como contexto.

## Qué decir

> Las Smart Actions ahorran tiempo porque son prompts preconstruidos. En vez de escribir “explícame este método”, selecciono el código y uso Explain.

---

# Parte 10 — Smart Action: Review

Selecciona todo el archivo `Program.cs` o un método específico.

Haz clic derecho:

```text
Copilot > Review
```

## Qué mostrar

Copilot puede sugerir mejoras relacionadas con:

- Legibilidad.
- Mantenibilidad.
- Seguridad.
- Validación de entradas.
- Buenas prácticas.

## Qué decir

> Review no reemplaza una revisión humana ni un pull request review formal. Es una primera capa de asistencia para detectar mejoras potenciales.

---

# Parte 11 — Agent Mode, si está disponible

En Copilot Chat, cambia el modo a:

```text
Agent
```

Usa este prompt:

```text
Add a simple console menu with three options:
1. Show all available books
2. Search books by title
3. Exit

Keep the code simple and readable.
```

## Qué mostrar

- Copilot puede proponer cambios directamente en archivos.
- Puede mostrar diferencias tipo diff.
- Puedes aceptar con `Keep` o rechazar con `Undo`.
- Puede pedir aprobación para comandos si necesita ejecutar algo.

## Qué decir

> Agent es más autónomo. Puede editar archivos y usar herramientas. Por eso también requiere más control. No debemos aceptar cambios sin revisarlos.

> Si Agent no está disponible en Copilot Free o ya se alcanzó el límite, podemos hacer lo mismo con Ask o Inline Chat, pero aplicando los cambios manualmente.

---

# Parte 12 — Código final recomendado

Puedes terminar la demo con este `Program.cs`:

```csharp
using System;
using System.Collections.Generic;
using System.Linq;

namespace LibraryDemo;

public record Book(string Title, string Author, bool IsAvailable);

class Program
{
    static void Main(string[] args)
    {
        List<Book> books = new()
        {
            new Book("Clean Code", "Robert C. Martin", true),
            new Book("The Pragmatic Programmer", "Andrew Hunt", true),
            new Book("Domain-Driven Design", "Eric Evans", false),
            new Book("Design Patterns", "GoF", true)
        };

        bool exit = false;

        while (!exit)
        {
            Console.WriteLine();
            Console.WriteLine("Library Demo");
            Console.WriteLine("1. Show all available books");
            Console.WriteLine("2. Search books by title");
            Console.WriteLine("3. Exit");
            Console.Write("Choose an option: ");

            string? option = Console.ReadLine();

            switch (option)
            {
                case "1":
                    DisplayAvailableBooks(books);
                    break;

                case "2":
                    Console.Write("Enter search term: ");
                    string? searchTerm = Console.ReadLine();

                    List<Book> results = SearchBooksByTitle(books, searchTerm);

                    Console.WriteLine("Search results:");
                    foreach (Book book in results)
                    {
                        Console.WriteLine($"- {book.Title} by {book.Author} | Available: {book.IsAvailable}");
                    }
                    break;

                case "3":
                    exit = true;
                    break;

                default:
                    Console.WriteLine("Invalid option.");
                    break;
            }
        }
    }

    static void DisplayAvailableBooks(List<Book> books)
    {
        Console.WriteLine("Available books:");

        foreach (Book book in books.Where(b => b.IsAvailable))
        {
            Console.WriteLine($"- {book.Title} by {book.Author}");
        }
    }

    public static List<Book> SearchBooksByTitle(List<Book> books, string? searchTerm)
    {
        if (string.IsNullOrWhiteSpace(searchTerm))
        {
            return new List<Book>();
        }

        return books
            .Where(book => book.Title.Contains(searchTerm, StringComparison.OrdinalIgnoreCase))
            .ToList();
    }
}
```

Ejecuta:

```bash
dotnet run
```

---

# Parte 13 — Generar pruebas unitarias simples

Desde la carpeta raíz `copilot-library-demo`, ejecuta:

```bash
cd ..
dotnet new xunit -n LibraryDemo.Tests
dotnet new sln -n LibraryDemoSolution
dotnet sln add LibraryDemo/LibraryDemo.csproj
dotnet sln add LibraryDemo.Tests/LibraryDemo.Tests.csproj
dotnet add LibraryDemo.Tests/LibraryDemo.Tests.csproj reference LibraryDemo/LibraryDemo.csproj
```

Luego pide a Copilot Chat:

```text
Generate xUnit tests for the SearchBooksByTitle method, including normal cases and edge cases.
```

## Qué explicar

Copilot puede generar pruebas, pero hay que revisar:

- Si realmente compilan.
- Si cubren casos borde.
- Si los datos de prueba tienen sentido.
- Si las aserciones son correctas.

---

# Parte 14 — Demo opcional rápida en Python

Si quieres mostrar que Copilot también funciona con Python, crea una carpeta nueva:

```bash
mkdir python-copilot-demo
cd python-copilot-demo
code .
```

Crea `library_demo.py` con este comentario:

```python
# Create a list of books and print only the available ones
```

Espera la sugerencia de Copilot.

Luego pregunta en Copilot Chat:

```text
Refactor this Python code into functions and add basic input validation.
```

## Qué decir

> El concepto es el mismo en .NET, Python, JavaScript o cualquier lenguaje soportado: contexto claro, prompt específico y revisión humana.

---

# Prompts listos para copiar y pegar

## Explicar archivo

```text
Explain what this Program.cs file does in simple terms.
```

## Explicar código seleccionado

```text
Explain the selected code and describe when it should be used.
```

## Refactorizar método

```text
Refactor this method to improve readability without changing its behavior.
```

## Agregar validación

```text
Add input validation to avoid null or empty search terms.
```

## Crear menú

```text
Add a simple console menu with options to show available books, search books by title, and exit.
```

## Generar pruebas

```text
Generate xUnit tests for the SearchBooksByTitle method, including normal cases and edge cases.
```

## Revisar código

```text
Review this code and suggest improvements for readability, maintainability, and safety.
```

## Explicar error

```text
Explain this error and suggest how to fix it.
```

---

# Guion corto para presentar la demo

## Apertura

> Vamos a ver una demo sencilla de GitHub Copilot Free en VS Code. No buscamos crear una aplicación empresarial completa. La idea es ver cómo Copilot ayuda en tareas reales: sugerir código, explicar, refactorizar, revisar y generar pruebas.

## Durante la demo

> Primero vamos a usar comentarios para generar código. Después usaremos Copilot Chat para explicar el archivo. Luego usaremos Inline Chat para refactorizar un bloque específico. Finalmente usaremos Smart Actions para explicar y revisar código.

## Cierre

> La gran lección es que Copilot funciona mejor cuando le damos buen contexto: archivos abiertos, nombres claros, comentarios específicos y prompts bien escritos. Copilot acelera el desarrollo, pero la responsabilidad técnica sigue siendo del desarrollador.

---

# Tips para que la demo salga bien

- Abre siempre `Program.cs` antes de pedir ayuda.
- Selecciona código antes de usar Inline Chat.
- Usa prompts cortos y específicos.
- No aceptes todo automáticamente.
- Si Copilot Free llega al límite, continúa con los ejemplos preparados.
- Si Agent Mode no está disponible, usa Ask o Inline Chat.
- Mantén la demo en .NET para aprovechar que ya tienes .NET 9 instalado.
- Si algo falla, usa el error como oportunidad para mostrar: `Explain this error and suggest how to fix it`.

---

# Mensaje final

GitHub Copilot Free es suficiente para demostrar el flujo básico de desarrollo asistido por IA en VS Code. La demo debe enfatizar tres ideas:

1. Copilot necesita contexto.
2. Copilot acelera tareas repetitivas y exploratorias.
3. El desarrollador siempre revisa, prueba y decide.
