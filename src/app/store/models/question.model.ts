export interface Question {
    id: string;
    category: string;
    type: string;
    difficulty: string;
    question: string;
    correctChoice: string;
    choices: Array<string>;
    answer?: string;
}
