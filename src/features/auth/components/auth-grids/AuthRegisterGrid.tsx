"use client";

import { useState } from "react";
import { Role } from "@/generated/prisma/enums";
import { getRoleLabel } from "@/lib/utils/enums-labels";
import { Button } from "@/features/shared/components/ui/button";
import {
    SuperAdminRegisterForm,
} from "../super-admin";
import { AdminRegisterForm } from "../admin";
import { InstructorRegisterForm } from "../instructor";
import { StudentRegisterForm } from "../student";

const ROLES = [Role.STUDENT, Role.INSTRUCTOR, Role.ADMIN, Role.SUPER_ADMIN];

interface AuthRegisterGridProps {
    tenantId: string;
}

export const AuthRegisterGrid = ({ tenantId }: AuthRegisterGridProps) => {
    const [selectedRole, setSelectedRole] = useState<Role>(Role.STUDENT);

    return (
        <div className="space-y-6">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {ROLES.map((role) => (
                    <Button
                        key={role}
                        variant={selectedRole === role ? "default" : "outline"}
                        onClick={() => setSelectedRole(role)}
                        className="w-full"
                    >
                        {getRoleLabel(role)}
                    </Button>
                ))}
            </div>

            <div className="border rounded-lg p-4">
                {selectedRole === Role.SUPER_ADMIN && <SuperAdminRegisterForm />}
                {selectedRole === Role.ADMIN && <AdminRegisterForm />}
                {selectedRole === Role.INSTRUCTOR && (
                    <InstructorRegisterForm tenantId={tenantId} />
                )}
                {selectedRole === Role.STUDENT && (
                    <StudentRegisterForm tenantId={tenantId} />
                )}
            </div>
        </div>
    );
};