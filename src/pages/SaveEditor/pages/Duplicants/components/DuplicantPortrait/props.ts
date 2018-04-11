
export default interface DuplicantPortraitProps {
    className?: string;
    duplicantKey: string;
    onClick?(duplicantKey: string): void;
}