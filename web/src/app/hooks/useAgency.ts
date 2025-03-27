import { useMemo, useState } from "react";
import { AgencyStatus, IAgency } from "../interfaces/IAgency";
import AgencyService from "../services/AgencyService";
import { AgencyCreateInput, AgencyUpdateFormValues } from "../schemas/agency";

export function useAgency() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [agencies, setAgencies] = useState<IAgency[]>([]);

  async function getAgency(id: string) {
    try {
      setIsLoading(true);
      const agency = await AgencyService.getAgency(id);

      if (agency.data) {
        setAgencies([agency.data]);
      }
    } finally {
      setIsLoading(false);
    }
  }

  async function listAgencies() {
    try {
      setIsLoading(true);
      const agencies = await AgencyService.listAgencies();

      if (agencies && Array.isArray(agencies.data)) {
        setAgencies(agencies.data);
      }
    } finally {
      setIsLoading(false);
    }
  }

  async function changeAgencyStatus(id: string, status: AgencyStatus) {
    try {
      setIsLoading(true);
      const agency = await AgencyService.updateAgency(id, {
        status,
      } as AgencyUpdateFormValues);

      if (agency.data) {
        setAgencies([agency.data]);
      }
    } finally {
      setIsLoading(false);
    }
  }

  async function updateAgency(id: string, data: AgencyUpdateFormValues) {
    try {
      setIsLoading(true);
      const agency = await AgencyService.updateAgency(id, data);

      if (agency) {
        setAgencies([agency.data]);
      }
    } finally {
      setIsLoading(false);
    }
  }

  async function createAgency(data: AgencyCreateInput) {
    try {
      setIsLoading(true);
      const agency = await AgencyService.createAgency(data);

      if (agency.data) {
        setAgencies((prevState) => [...prevState, agency.data]);
      }
    } finally {
      setIsLoading(false);
    }
  }

  async function deleteAgency(id: string) {
    try {
      setIsLoading(true);
      await AgencyService.deleteAgency(id);

      setAgencies((prevState) =>
        prevState.filter((agency) => agency.id !== id)
      );
    } finally {
      setIsLoading(false);
    }
  }

  const value = useMemo(
    () => ({
      getAgency,
      listAgencies,
      changeAgencyStatus,
      updateAgency,
      createAgency,
      deleteAgency,
      agencies,
      isLoading,
    }),
    [
      getAgency,
      listAgencies,
      changeAgencyStatus,
      createAgency,
      updateAgency,
      deleteAgency,
      agencies,
      isLoading,
    ]
  );

  return value;
}
