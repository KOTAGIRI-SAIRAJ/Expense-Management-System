/**
 * Created by semanticbits on 27/6/17.
 */
export class localStorageService{
  setLocalStorageValue(value){
    console.log(value);
    localStorage.setItem('LoggedIn User',JSON.stringify(value));
  }
  getLocalStorageValue(){
    return JSON.parse(localStorage.getItem('LoggedIn User'));
  }
}
