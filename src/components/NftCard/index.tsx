/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { NFT } from "@thirdweb-dev/react";
import { useEffect, useState } from "react";
import { getContract } from "thirdweb";
import { tokenUri } from "thirdweb/extensions/erc1155";
import { tokenURI } from "thirdweb/extensions/erc721";
import NftPlaceholder from "../../assets/nft-placeholder.png";
import { chainId, chains } from "../../configs";
import { client } from "../../configs/client";
import { truncateStr } from "../../utils";

export interface INftCard {
  nftInfo: NFT;
  contractAddress: string | undefined;
  handleTransfer: (
    e: React.MouseEvent<HTMLElement>,
    nft: NFT,
    contractAddress: string | undefined
  ) => void;
}

export const NftCard = ({
  nftInfo,
  handleTransfer,
  contractAddress,
}: INftCard) => {
  console.log("nftInfo: ", nftInfo);

  const [metadata, setMetadata] = useState<any>(undefined);

  console.log("metadata: ", metadata);
  useEffect(() => {
    const getTokenMetadata = async () => {
      const contract = getContract({
        client: client,
        address: contractAddress!,
        chain: chains[chainId],
      });

      if (contract) {
        let result;
        if (nftInfo?.type === "ERC1155") {
          result = await tokenUri({
            contract,
            tokenId: BigInt(nftInfo?.metadata?.id),
          });
        } else {
          result = await tokenURI({
            contract,
            tokenId: BigInt(nftInfo?.metadata?.id),
          });
        }

        const metadata = await (await fetch(result as string)).json();

        setMetadata(metadata);
      }
    };

    getTokenMetadata();
  }, [contractAddress, nftInfo?.metadata?.id, nftInfo?.type, setMetadata]);

  return (
    <>
      <Card
        sx={{
          maxWidth: 345,
          borderRadius: 1,
          width: 300,
          height: "fit-content",
        }}
      >
        <CardMedia
          component="img"
          height="240"
          image={nftInfo?.metadata?.image || NftPlaceholder}
          alt="nft-image"
        />
        <CardContent sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          <Typography gutterBottom variant="h5" component="div">
            {truncateStr(nftInfo?.metadata?.name?.toString() || "", 20)}
          </Typography>

          {nftInfo?.type === "ERC1155" ? (
            <Typography
              variant="body2"
              color="text.secondary"
              textAlign="start"
            >
              <b>Token Quantity: </b> {nftInfo?.quantityOwned || 0}
            </Typography>
          ) : (
            <Typography variant="body2" color="text.secondary">
              {truncateStr(nftInfo?.metadata?.description || "", 50)}
            </Typography>
          )}

          <Button
            variant="contained"
            disabled={nftInfo.type === "ERC1155"}
            onClick={(e) => handleTransfer(e, nftInfo, contractAddress)}
          >
            Transfer
          </Button>
        </CardContent>
      </Card>
    </>
  );
};

export default NftCard;
