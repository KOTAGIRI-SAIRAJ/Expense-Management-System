/**
 * Created by semanticbits on 27/6/17.
 */
export class localStorageService{
  setLocalStorageValue(value){
    console.log('from LocalStorge set')
    console.log(value);
    localStorage.setItem('LoggedIn User',JSON.stringify(value));
  }
  getLocalStorageValue(){
    console.log('from LocalStorge get')
    return JSON.parse(localStorage.getItem('LoggedIn User'));
  }
}
