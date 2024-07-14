import Input from "@components/ui/input";
import { Controller, useForm } from "react-hook-form";
import TextArea from "@components/ui/text-area";
// import { useCheckoutMutation } from "@framework/checkout/use-checkout";
import { CheckBox } from "@components/ui/checkbox";
import Button from "@components/ui/button";
import { useRouter } from "next/router";
import { ROUTES } from "@utils/routes";
import { useTranslation } from "next-i18next";
import Select from "react-select";
import { CheckoutInputType } from "src/types/Checkout";
import { API_ENDPOINTS, BASE_URL } from "@utils/constants";
import http from "@framework/utils/http";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useGetCitiesByStateId, useGetState } from "@framework/address";
import { isEmpty } from "lodash";
import { toast } from "react-toastify";
import { useCart } from "@contexts/cart/cart.context";
import { useCheckoutMutation } from "src/api/queries/home/Checkout/Checkout.query";

const customStyles = {
  control: (provided: any, state: any) => ({
    ...provided,
    boxShadow: state.isFocused ? "0 0 0 1px black" : provided.boxShadow,
    borderColor: state.isFocused ? "black" : provided.borderColor,
    "&:hover": {
      borderColor: state.isFocused ? "black" : "black",
    },
  }),
  option: (provided: any, state: any) => ({
    ...provided,
    backgroundColor: state.isFocused ? "black" : provided.backgroundColor,
    color: state.isFocused ? "white" : provided.color,
    "&:hover": {
      backgroundColor: "black",
      color: "white",
    },
  }),
};

const CheckoutForm: React.FC = () => {
  const { t } = useTranslation();
  const { isEmpty: isCartEmpty } = useCart();
  const router = useRouter();
  const {
    mutate: updateUser,
    isPending,
    error,
    isError,
  } = useCheckoutMutation();
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<CheckoutInputType>();
  function onSubmit(input: CheckoutInputType) {
    updateUser(input);
  }

  const [state, setState] = useState("");
  // const [city, setCity] = useState("");
  // const queryClient = useQueryClient();
  const [cityOptions, setCityOptions] = useState<
    { value: string | number; label: string }[]
  >([]);
  const [stateOptions, setStateOptions] = useState<
    { value: string | number; label: string }[]
  >([]);
  // @ts-ignore TODO
  const {
    data: stateData,
    isLoading: isLoadingStates,
    isFetched: fetchedState,
  } = useGetState();
  // @ts-ignore TODO
  const { data: citiesData, isLoading: isLoadingCities } =
    useGetCitiesByStateId(state ?? 0);

  useEffect(() => {
    // console.log("🚀 ~ citiesData:", citiesData);
    if (state) {
      const options = citiesData?.data?.data?.map((c) => ({
        value: c.id,
        label: c.name,
      }));
      setCityOptions(options!);
    }
  }, [state, isLoadingCities]);
  useEffect(() => {
    // console.log("🚀 ~ stateData:", stateData);
    if (fetchedState) {
      const options = stateData?.data?.data?.map((s) => ({
        value: s.id,
        label: s.name,
      }));
      setStateOptions(options!);
    }
  }, [isLoadingStates]);

  return (
    <>
      <h2 className="text-lg md:text-xl xl:text-2xl font-bold text-heading mb-6 xl:mb-8">
        {t("text-shipping-address")}
      </h2>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full mx-auto flex flex-col justify-center "
        noValidate
      >
        <div className="flex flex-col space-y-4 lg:space-y-5">
          <div className="flex flex-col lg:flex-row space-y-4 lg:space-y-0">
            <Input
              labelKey="forms:label-first-name"
              {...register("firstName", {
                required: "forms:first-name-required",
              })}
              errorKey={errors.firstName?.message}
              variant="solid"
              className="w-full lg:w-1/2 "
            />
            <Input
              labelKey="forms:label-last-name"
              {...register("lastName", {
                required: "forms:last-name-required",
              })}
              errorKey={errors.lastName?.message}
              variant="solid"
              className="w-full lg:w-1/2 ltr:lg:ml-3 rtl:lg:mr-3 mt-2 md:mt-0"
            />
          </div>
          <div className="flex flex-col lg:flex-row space-y-4 lg:space-y-0">
            <Input
              type="tel"
              labelKey="forms:label-phone"
              {...register("phone", {
                required: "forms:phone-required",
              })}
              errorKey={errors.phone?.message}
              variant="solid"
              className="w-full lg:w-1/2 "
            />

            <Input
              type="email"
              labelKey="forms:label-email-star"
              {...register("email", {
                required: "forms:email-required",
                pattern: {
                  value:
                    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                  message: "forms:email-error",
                },
              })}
              errorKey={errors.email?.message}
              variant="solid"
              className="w-full lg:w-1/2 ltr:lg:ml-3 rtl:lg:mr-3 mt-2 md:mt-0"
            />
          </div>
          <div className="flex flex-col lg:flex-row space-y-4 lg:space-y-0">
            <div className="w-full lg:w-1/2 ltr:lg:ml-3 rtl:lg:mr-3 mt-2 md:mt-0">
              <label
                htmlFor={"state"}
                className="block text-gray-600 font-semibold text-sm leading-none mb-3 cursor-pointer"
              >
                State
              </label>

              <Controller
                name="state"
                control={control}
                render={({ field: { onChange, value } }) => (
                  <>
                    <Select
                      styles={customStyles}
                      isDisabled={isLoadingStates || isEmpty(stateOptions)}
                      options={stateOptions}
                      id="state"
                      value={stateOptions?.find((c) => c.value === value)}
                      onChange={(val:any) => {
                        // console.log("🚀 ~ val:", val);
                        setState(val?.value);
                        onChange(val?.value);
                      }}
                    />
                    {errors.city?.message && (
                      <p className="my-2 text-xs text-red-500">
                        {errors.city?.message}
                      </p>
                    )}
                  </>
                )}
                rules={{
                  required: { value: true, message: "City is required." },
                }}
              />
            </div>
            <div className="w-full lg:w-1/2 ltr:lg:ml-3 rtl:lg:mr-3 mt-2 md:mt-0">
              <label
                htmlFor={"city"}
                className="block text-gray-600 font-semibold text-sm leading-none mb-3 cursor-pointer"
              >
                City
              </label>

              <Controller
                name="city"
                control={control}
                render={({ field: { onChange, value } }) => (
                  <>
                    <Select
                      styles={customStyles}
                      isDisabled={!state}
                      id="city"
                      options={cityOptions}
                      value={cityOptions?.find((c) => c.value === value)}
                      onChange={(val) => {
                        onChange(val?.value);
                      }}
                    />
                    {errors.state?.message && (
                      <p className="my-2 text-xs text-red-500">
                        {errors.state?.message}
                      </p>
                    )}
                  </>
                )}
                rules={{
                  required: { value: true, message: "State is required." },
                }}
              />
            </div>
            {/* <Input
              labelKey="forms:label-country"
              {...register("country", {
                required: "forms:country-required",
              })}
              variant="solid"
              className="w-full lg:w-1/2"
              // errorKey={errors.country?.message}
            />
            <Input
              labelKey="forms:label-city"
              {...register("city", {
                required: "forms:city-required",
              })}
              variant="solid"
              className="w-full lg:w-1/2 ltr:lg:ml-3 rtl:lg:mr-3 mt-2 md:mt-0"
              errorKey={errors.city?.message}
            /> */}
          </div>
          <Input
            labelKey="forms:label-streetAddress"
            {...register("streetAddress", {
              required: "forms:address-required",
            })}
            errorKey={errors.streetAddress?.message}
            variant="solid"
          />
          <div className="relative flex items-center ">
            <CheckBox labelKey="forms:label-save-information" />
          </div>
          {/* <TextArea
            labelKey="forms:label-order-notes"
            {...register("note")}
            placeholderKey="forms:placeholder-order-notes"
            className="relative pt-3 xl:pt-6"
          /> */}
          <div className="flex w-full">
            <Button
              className="w-full sm:w-auto"
              loading={isPending}
              disabled={isPending || isCartEmpty}
            >
              {t("common:button-place-order")}
            </Button>
          </div>
        </div>
      </form>
    </>
  );
};

export default CheckoutForm;
