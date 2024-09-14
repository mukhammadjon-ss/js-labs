interface Observer {
  update(news: string): void;
}

export interface Subject {
  subcribe(observer: Observer): void;
  unsubscribe(observer: Observer): void;
  notify(): void;
}

// Publisher
class NewsAgency implements Subject {
  private observers: Observer[] = []; // subscribers;
  private lastestNews: string = "";

  subcribe(observer: Observer): void {
    this.observers.push(observer);
  }

  unsubscribe(observer: Observer): void {
    this.observers = this.observers.filter((sub) => sub !== observer);
  }

  notify(): void {
    for (const observer of this.observers) {
      console.log(observer);
      observer.update(this.lastestNews);
    }
  }

  publishNews(news: string) {
    this.lastestNews = news;
    this.notify();
  }
}

class Subscriber implements Observer {
  constructor(private name: string) {}

  update(news: string): void {
    console.log(`${this.name} recevied news: ${news}`);
  }
}

const newsAgency = new NewsAgency();

const subs1 = new Subscriber("Subscribe 1");
const subs2 = new Subscriber("Subscriber 2");

newsAgency.subcribe(subs1);
newsAgency.subcribe(subs2);

newsAgency.publishNews("Hello, World");
