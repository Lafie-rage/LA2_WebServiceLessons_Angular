import {Observable, of} from "rxjs";
import {MessagesService} from "../../messages/services/message.service";

export abstract class BaseService {

  /**
   * The base URL of the API.
   * @protected
   */
  protected baseApiUrl = "http://app-ec21e68e-3e55-42d7-b1ae-3eef7507a353.cleverapps.io/"

  protected constructor(private messagesService: MessagesService) {
  }

  /**
   * Transmit a new log message to the MessageService.
   *
   * @param message The message to transmit
   * @protected
   */
  protected log(message: string): void {
    this.messagesService.add(`PokemonService: ${message}`);
  }

  /**
   * Manage an error message by printing it in the console logs and transmiting it to the MessageService via the log() method.
   * Then, returns an Observable of the provided result type.
   *
   * @param operation A string representing the operation that throws the error.
   * @param result The wished result of calling function.
   *
   * @return A anonymous function which ask of an error of any type and returns an Observable of the provided result type.
   * @protected
   */
  protected handleError<T>(operation = 'operation', result?: T): (error: any) => Observable<T> {
    return (error: any): Observable<T> => {
      // TODO : send the error to remote logging infrastructure
      console.error(error); // Log to console instead

      // TODO : Better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`)

      // Let the app keep running by returning an empty result
      return of(result as T)
    }
  }
}
