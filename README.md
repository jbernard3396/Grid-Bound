# Grid-Bound
Instantiation of a grid for a 2-d grid based game

# Automated Tests
To run automated tests navigate to this folder in a shell and run 

`npm run test`

NOTE: That this tests the .ts files and not the .js files; you do NOT need to transpile before running this command (although you are welcome to)

## TDD
This project is being developed using TDD. The process I am following largely follows four steps
1. Write out a test that tests required functionality of your code.  Run it and make sure it fails
2. Write just enough code to pass that test
3. Refactor, keeping the tests green
4. repeat

Learn more [here](https://testdriven.io/test-driven-development/#:~:text=Test%2DDriven%20Development%20(TDD),It%20combines%20building%20and%20testing.)

# Typescript
We have elected to try Typescript for this project.  Here are answers to some common questions
## How do I develop?
You're gonna want to write all of your code in the src/ folder in files called \<whatever\>.ts and then you will need to **`transpile`** that code into js before running it

## How do I transpile

`ctrl+shift+b`

Or if that doesn't work, navigate to /src and run

`tsc`

You can learn more about this build command by investigating .vscode/tasks.json or by going to `Terminal`>`Configure Default Build Task...`
## How can I learn more
[This](https://code.visualstudio.com/docs/typescript/typescript-compiling) is the link we followed to get where we are

# Trello board
Learn more about where this project is going and what needs done next by going to this [trello board](https://trello.com/b/qlDI8q68/grid-locked)

# Npm Package
Created following [this guide](https://docs.github.com/en/packages/working-with-a-github-packages-registry/working-with-the-npm-registry#publishing-a-package)


