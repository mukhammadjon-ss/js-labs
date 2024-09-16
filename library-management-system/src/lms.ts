abstract class LibraryItem {
    constructor(public id: string) {}

    abstract getDetails(): string;
}

export class Book extends LibraryItem {
    constructor(
        id: string,
        public title: string,
        public author: string,
        public isbn: string,
        public publishedDate: Date,
        public genre: string,
        public lendable: boolean
    ) {
        super(id);
    }

    getDetails() {
        return `${this.title} by ${this.author} \n
                Published: ${this.publishedDate} \n
                ISBN: ${this.isbn} \n
                Genre: ${this.genre} \n
                Can be borrowed: ${this.lendable}`;
    }
}

class LibraryMember {
    constructor(
        public id: string,
        public name: string,
        public age: number,
        protected borrowedItems: LibraryItem[]
    ) {}

    memberDescription() {
        return `Member Id: ${this.id} \n
                Name: ${this.name} \n
                Age: ${this.age} \n
                Items Borrowed: ${this.borrowedItems.length}`;
    }

    getBorrowedItemsCount() {
        return this.borrowedItems.length;
    }

    currentlyBorrowing(item: LibraryItem) {
        return this.borrowedItems.includes(item);
    }

    borrowItem(item: LibraryItem): boolean {
        if (!this.borrowedItems.includes(item)) {
            this.borrowedItems.push(item);
            return true;
        }
        return false;
    }

    returnItem(item: LibraryItem) {
        this.borrowedItems = this.borrowedItems.filter(function (i) {
            return i.id != item.id;
        });
    }
}

export class AdultMember extends LibraryMember {
    borrowLimit = 10;

    borrowItem(item: LibraryItem): boolean {
        if (this.borrowedItems.length < this.borrowLimit) {
            return super.borrowItem(item);
        } else {
            console.log(
                `Limit for borrowing books (${this.borrowLimit}) exceeded`
            );
            return false;
        }
    }

    memberDescription(): string {
        return `Member Id: ${this.id} \n
                Name: ${this.name} \n
                Age: ${this.age} \n
                Content Category: Adult \n 
                Items Borrowed: ${this.borrowedItems.length}`;
    }
}

export class ChildMember extends LibraryMember {
    borrowLimit = 5;

    borrowItem(item: LibraryItem): boolean {
        if (this.borrowedItems.length < this.borrowLimit) {
            super.borrowItem(item);
            return true;
        } else {
            console.log(
                `Limit for borrowing books (${this.borrowLimit}) exceeded`
            );
            return false;
        }
    }

    memberDescription(): string {
        return `Member Id: ${this.id} \n
                Name: ${this.name} \n
                Age: ${this.age} \n
                Content Category: Teen \n 
                Items Borrowed: ${this.borrowedItems.length}`;
    }
}

class Loan {
    constructor(
        public member: LibraryMember,
        public item: LibraryItem,
        public expirationDate: Date
    ) {}
}

export class Library {
    constructor(
        private items: LibraryItem[],
        private members: LibraryMember[],
        private loans: Loan[],
        private fines: Map<string, Fine[]>
    ) {}

    addItem(item: LibraryItem) {
        if (!this.items.includes(item)) {
            this.items.push(item);
        }
    }

    removeItem(item: LibraryItem) {
        for (let idx = 0; idx < this.items.length; ++idx) {
            if (item.id == this.items[idx].id) {
                this.items.splice(idx, 1);
                return;
            }
        }
    }

    getItemsCount() {
        return this.items.length;
    }

    addMember(member: LibraryMember) {
        if (!this.members.includes(member)) {
            this.members.push(member);
        }
    }

    removeMember(member: LibraryMember) {
        for (let idx = 0; idx < this.members.length; ++idx) {
            if (member.id == this.members[idx].id) {
                this.members.splice(idx, 1);
                return;
            }
        }
    }

    getMembersCount() {
        return this.members.length;
    }

    loanItem(item: LibraryItem, member: LibraryMember): string {
        if (!this.items.includes(item)) {
            return "Item not found.";
        }

        if (!this.members.includes(member)) {
            return "Non-members cannot borrow books. Sorry.";
        }

        if (this.loans.find(loan => loan.item.id == item.id)) {
            return "Item in use by another member.";
        }

        if (this.fines.has(member.id)) {
            return "You have unpaid fines.";
        }

        if (member.borrowItem(item)) {
            this.loans.push(new Loan(member, item, new Date()));
            return "Item lending successful.";
        }
        return "Item lending unsuccessful.";
    }

    returnItem(item: LibraryItem, member: LibraryMember): string {
        for (let idx = 0; idx < this.loans.length; ++idx) {
            if (
                this.loans[idx].item.id == item.id &&
                this.loans[idx].member.id == member.id
            ) {
                this.applyFines(idx, member.id);
                member.returnItem(item);
                this.loans.splice(idx, 1);
                return `Item (id: ${item.id}) returned successfully.`;
            }
        }

        return `Item (id: ${item.id}) not found or member does not exist.`;
    }

    getLoansCount() {
        return this.loans.length;
    }

    getItem(idx: number) {
        if (idx < 0 || idx >= this.items.length) {
            return undefined;
        }
        return this.items[idx];
    }

    getMember(idx: number) {
        if (idx < 0 || idx >= this.members.length) {
            return undefined;
        }
        return this.members[idx];
    }

    private applyFines(loanId: number, memberId: string) {
        let now = new Date().getTime();
        let then = this.loans[loanId].expirationDate.getTime();
        if (then < now) {
            var dateDiff = Math.abs(then - now) / Constants.DAY_IN_MS;
            var memberFine = {
                id: `almostUnique${memberId}`,
                amount: dateDiff * Constants.FINE_AMOUNT_PER_DAY,
                reason: "Overdue"
            };

            if (this.fines.has(memberId)) {
                // @ts-ignore
                this.fines[memberId].push(memberFine);
            } else {
                // @ts-ignore
                this.fines[memberId] = [memberFine];
            }
            return;
        }

        // should be handled property, but will do for now
        let hasFine = Math.round(Math.random());
        if (hasFine) {
            if (this.fines.has(memberId)) {
                // @ts-ignore
                return this.fines[memberId].push({
                    id: `almostUnique${memberId}`,
                    amount: Constants.RANDOM_FINE_AMOUNT,
                    reason: "DamagedItem"
                });
            }
        }
    }
}

// interfaces
interface Fine {
    id: string;
    amount: number;
    reason: "Overdue" | "LostItem" | "DamagedItem";
}

// constants
class Constants {
    static DAY_IN_MS = 1000 * 60 * 60 * 24;
    static FINE_AMOUNT_PER_DAY = 12;
    static RANDOM_FINE_AMOUNT = 50;
}
