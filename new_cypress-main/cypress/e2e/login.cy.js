import * as data from "../helpers/default_data.json"
import * as main_page from "../locators/main_page.json";
import * as recovery_password_page from "../locators/recovery_password_page.json"
import * as result_page from "../locators/result_page.json"

describe('Проверка авторизации', function () {
    
    beforeEach('Начало теста', function () {
        cy.visit('/'); // зашли на сайт

        cy.get(main_page.title).should('be.visible'); // проверяю что "форма логина" видна пользователю
        cy.get(main_page.title).contains('Форма логина'); // проверяю текст "Форма логина"
        cy.get(main_page.email).should('be.visible'); // проверяю что импут логин виден пользователю
        cy.get(main_page.password).should('be.visible'); // проверяю что импут пароль виден пользователю
        cy.get(main_page.login_button).should('be.visible'); // проверка что кнопка войти видна пользователю
        cy.get(main_page.fogot_pass_btn).should('be.visible'); // проверка что кнопка забыли пароль видна пользоваелю
        cy.get(main_page.fogot_pass_btn).contains('Забыли пароль?'); // проверяю что текст кнопки забыли пароль
        cy.get(main_page.fogot_pass_btn).should('have.css', 'color', 'rgb(0, 85, 152)'); // проверяю цвет кнопки забыли пароль
        cy.get(main_page.footer).should('be.visible');// проверка что кнопка qa.studio видена пользоваелю
        cy.get(main_page.footer).contains('qa.studio'); // проверка текста кнопки qa.studio
        });

   afterEach('Конец теста', function () {
         cy.get(result_page.close).should('be.visible'); // проверить что крестик есть и виден для пользователя
         cy.get(result_page.title).should('be.visible'); // текст результата виден пользователю
         cy.get(result_page.footer).should('be.visible');// проверка что кнопка qa.studio видена пользоваелю
         cy.get(result_page.footer).contains('qa.studio'); // проверка текста кнопки qa.studio
        });

    it('Верный логин и верный пароль', function () {

        cy.get(main_page.email).type(data.login); // ввели верный логин
        cy.get(main_page.password).type(data.password); // ввели верный пароль
        cy.get(main_page.login_button).click(); // нажать войти
        
        cy.get(result_page.title).contains('Авторизация прошла успешно'); // проверить текст после авторизации
    });
    it('Забыли пароль', function () {

        cy.get(main_page.fogot_pass_btn).click(); // нажать кнопку забыли пароль

        cy.get(recovery_password_page.title).should('be.visible'); // проверяю что текст восстановите пароль виден пользователю
        cy.get(recovery_password_page.title).contains('Восстановите пароль'); // проверяю текст восстановите пароль
        cy.get(recovery_password_page.email).should('be.visible'); // проверяю что импут логина виден пользователю
        cy.get(recovery_password_page.send_button).should('be.visible'); // проверяю что кнопка отправить код видна пользователю
        cy.get(recovery_password_page.send_button).contains('Отправить код'); // проверяю текст кнопки отправить код

        cy.get(recovery_password_page.email).type('german@dolnikov.ru'); // ввести верный логин
        cy.get(recovery_password_page.send_button).click(); // нажать на кнопку отправить код

        cy.get(result_page.title).contains('Успешно отправили пароль на e-mail'); // проверка текста Успешно отправили пароль на e-mail
    });
    it('Верный логин и неверный пароль', function () {
    
        cy.get(main_page.email).type(data.login); // верный логин
        cy.get(main_page.password).type('pokemons'); // неверный пароль
        cy.get(main_page.login_button).click(); // нажать кнопку войти

        cy.get(result_page.title).contains('Такого логина или пароля нет'); // проверяю текст Такого логина или пароля нет
    });
    it('Неверный логин и верный пароль', function () {
       
        cy.get(main_page.email).type('ger@dolnikov.ru'); // неверный логин
        cy.get(main_page.password).type(data.password); // ввели верный пароль
        cy.get(main_page.login_button).click(); // нажать кнопку войти

        cy.get(result_page.title).contains('Такого логина или пароля нет'); // проверяю текст Такого логина или пароля нет
    });
    it('Валидация на наличие @', function () {

        cy.get(main_page.email).type('germandolnikov.ru');// логин без @
        cy.get(main_page.password).type(data.password); // верный пароль
        cy.get(main_page.login_button).click();// нажать войти 

        cy.get(result_page.title).contains('Нужно исправить проблему валидации'); // проверка текста Нужно исправить проблему валидации
    });
    it('Верный логин заглавными и верный пароль', function () {

        cy.get(main_page.email).type('GerMan@Dolnikov.ru'); // ввели верный логин
        cy.get(main_page.password).type(data.password); // ввели верный пароль
        cy.get(main_page.login_button).click(); // нажать войти
        
        cy.get(result_page.title).contains('Авторизация прошла успешно'); // проверить текст после авторизации
    });
});

