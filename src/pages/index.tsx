import axios from "axios";
import { GetStaticProps } from "next";
import Container from "@components/ui/container";
import Layout from "@components/layout/layout";
import Divider from "@components/ui/divider";
import BannerWithProducts from "@containers/banner-with-products";
import BannerGridBlock from "@containers/banner-grid-block";
import CategoryBanner from "@containers/category-banner";
import CategoryBlock from "@containers/category-block";
import ProductsWithFlashSale from "@containers/products-with-flash-sale"; // Import the component
import ProductsBlockCarousel from "@containers/products-block-carousel";
import CategoryGridBlock from "@containers/category-grid-block";
import BannerSliderBlock from "@containers/banner-slider-block";
import ProductsFeatured from "@containers/products-featured";
import ProductsFlashSaleCarousel from "@containers/product-flash-sale-carousel";

type PreviewData = {
  sectionName: string;
  content: string;
};

type ConfigsData = {
  components: {
    name: string;
    images: {
      content: string;
      originalSection: string;
    }[];
  }[];
};

const defaultPreviewData: PreviewData[] = [
  {
    sectionName: "products",
    content: "product1",
  },
  {
    sectionName: "banners",
    content: "banner1",
  },
  {
    sectionName: "categories",
    content: "category2",
  },
];

export default function Home({ previewData }: { previewData: PreviewData[] }) {
  console.log('Received previewData:', previewData);

  const renderSection = (section: PreviewData) => {
    switch (section.sectionName.toLowerCase()) {
      case "banners":
        switch (section.content) {
          case "banner1":
            return <BannerSliderBlock key={section.content} sectionHeading="" />;
          case "banner2":
            return <BannerGridBlock key={section.content} />;
          default:
            return null;
        }

      case "categories":
        switch (section.content) {
          case "category1":
            return <CategoryGridBlock key={section.content} data={undefined} error={undefined} isLoading={undefined} />;
          case "category2":
            return <CategoryBlock key={section.content} sectionHeading="" />;
          default:
            return null;
        }

      case "products":
        switch (section.content) {
          case "product1":
            return <ProductsFlashSaleCarousel key={section.content} />;
          case "product2":
            return <BannerWithProducts key={section.content} sectionHeading="" loading={true} />;
          default:
            return null;
        }

      default:
        return null;
    }
  };

  return (
    <>
      <Container>
        {previewData.length > 0 ? (
          previewData.map((section, index) => (
            <div key={index}>{renderSection(section)}</div>
          ))
        ) : (
          <div>No Preview Data Available</div>
        )}
      </Container>
      <Divider className="mb-0" />
    </>
  );
}

Home.Layout = Layout;

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  let previewData: PreviewData[] = [];

  try {
    const response = await axios.get('https://app.onshophq.com/api/store/configs', {
      headers: {
        'Authorization': `Bearer ${process.env.YOUR_ACCESS_TOKEN}`, // Replace with your actual environment variable
        'Content-Type': 'application/json',
        'store-id': '7' // Replace with your actual store ID
      }
    });

    const data = response.data.data;
    console.log('API response data:', data);

    if (data && data.configs) {
      const parsedConfigs: ConfigsData = JSON.parse(data.configs);

      previewData = parsedConfigs.components.flatMap(component =>
        component.images.map(image => ({
          sectionName: image.originalSection.toLowerCase(), // Convert section names to lowercase
          content: image.content
        }))
      );
    } else {
      console.error('No valid configs found in API response:', data);
      previewData = defaultPreviewData; // Use default preview data if no valid configs found
    }

    console.log('Transformed previewData:', previewData);

  } catch (error) {
    console.error('Error fetching preview data:', error);
    console.error('Error details:', error.response?.data || error.message);
    previewData = defaultPreviewData; // Use default preview data if there's an error
  }

  return {
    props: {
      previewData,
    },
  };
};
