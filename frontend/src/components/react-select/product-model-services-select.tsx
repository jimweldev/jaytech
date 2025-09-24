import { AxiosError } from 'axios';
import { AsyncPaginate, type LoadOptions } from 'react-select-async-paginate';
import { toast } from 'sonner';
import type { ReactSelectOption } from '@/04_types/_common/react-select-option';
import type { ProductModelServices } from '@/04_types/product/product-model-services';
import { mainInstance } from '@/07_instances/main-instance';

const ProductModelServicesSelect = ({ ...props }) => {
  const loadOptions: LoadOptions<
    ReactSelectOption,
    never,
    { page: number }
  > = async (searchQuery, _loadedOptions, additional = { page: 1 }) => {
    const page = additional.page || 1;

    try {
      const response = await mainInstance.get(
        `/select/services?page=${page}&search=${searchQuery}&sort=name`,
      );

      const options = response.data.records.map(
        (service: ProductModelServices) => ({
          value: service.id,
          label: service.name,
        }),
      );

      return {
        options,
        hasMore: response.data.meta.total_pages > page,
        additional: {
          page: page + 1,
        },
      };
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        toast.error(
          error.response?.data?.message || error.message || 'An error occurred',
        );
      } else {
        toast.error('An unknown error occurred');
      }

      return {
        options: [],
        hasMore: false,
      };
    }
  };

  return (
    <AsyncPaginate
      className="react-select-container"
      classNamePrefix="react-select"
      loadOptions={loadOptions}
      debounceTimeout={200}
      additional={{ page: 1 }}
      getOptionValue={(opt) => String(opt.value)}
      getOptionLabel={(opt) => opt.label}
      {...props}
      closeMenuOnSelect={!props.isMulti}
    />

  );
};

export default ProductModelServicesSelect;
