
export default interface DuplicantPortraitProps {
    className?: string;
    duplicantID: number;
    onClick?(duplicantID: number): void;
}