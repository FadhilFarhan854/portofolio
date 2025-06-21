/* eslint-disable @typescript-eslint/no-explicit-any */
export const searchData = async (vector: number[]): Promise<{ metadata: any; narasi: string; list: string[] }> => {
    try {
      const response = await fetch('/api/pinecone', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          vector: vector

        }),
      });
  
      if (!response.ok) {
        const errorMessage = await response.text(); // Extract error response
        console.error('Error details:', errorMessage);
        throw new Error(`Network response was not ok: ${response.status} - ${errorMessage}`);
      }
  
      const data = await response.json();
  
      // Extract the metadata and score from the best match, if available
      if (data.matches?.length > 0) {
        const bestMatch = data.matches[0]; 
        const metadata = bestMatch.metadata ;
        return {
          metadata,
          narasi: bestMatch.metadata?.narasi,
          list: bestMatch.metadata?.list 
        };
      }
  
      // No matches found
      return {
        metadata: "not found",
        narasi: "not found",
        list: []
        };
    } catch (error: any) {
      console.error('Error during searchData fetch:', error.message || error);
      throw new Error('Failed to fetch search data.');
    }
  };
  