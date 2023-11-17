import { Suspense } from 'react';
import { Modal } from '@/shared/ui/redesigned/Modal';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Loader } from '@/shared/ui/deprecated/Loader';
import RegistrationFrom from '../RegisterForm/RegisterForm';


interface LoginModalProps {
    className?: string;
    isOpen: boolean;
    onClose: () => void;
}

export const RegisterModal = ({ className, isOpen, onClose }: LoginModalProps) => (
    <Modal
        className={classNames('', {}, [className])}
        isOpen={isOpen}
        onClose={onClose}
        lazy
    >
        <Suspense fallback={<Loader />}>
            <RegistrationFrom onSuccess={onClose}/>
        </Suspense>
    </Modal>
);
