import { FleekSdk, PersonalAccessTokenService } from '@fleek-platform/sdk';


const Fleeker = () => {

    const accessTokenServiceA = new PersonalAccessTokenService({
        personalAccessToken: "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhcHA6Y2x6dGd3bHd4MDAwMXVwdnY3MHhneHR5ZSIsInByb2plY3RJZCI6ImNseWtybjZtcjAwMDNudWIxbHZzZXZxZDQiLCJleHAiOjE3MjM2Mjc4NDF9.UgM4NrjzWHS5JPsxrARMqjU-y4PFUE8aRKxkwXr969c",
        projectId: 'clykrn6mr0003nub1lvsevqd4',
    });
    const accessTokenServiceB = new PersonalAccessTokenService({
        personalAccessToken: "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhcHA6Y2x6dGd3bHd4MDAwMXVwdnY3MHhneHR5ZSIsInByb2plY3RJZCI6ImNseWtybjZtcjAwMDNudWIxbHZzZXZxZDQiLCJleHAiOjE3MjM2Mjc4NDF9.UgM4NrjzWHS5JPsxrARMqjU-y4PFUE8aRKxkwXr969c",
        projectId: 'clykrn6mr0003nub1lvsevqd4',
    });


    const fleekSdkInstanceA = new FleekSdk({
        accessTokenService: accessTokenServiceA,
    });

    const fleekSdkInstanceB = new FleekSdk({
        accessTokenService: accessTokenServiceB,
    });

    console.log(accessTokenServiceA, accessTokenServiceB)

    async function FleekCreate() {

        const projectId = await FleekSdk.projects().create({
            name: 'SYSLink Commerce',
        });

        console.log(projectId)

        const projects = await FleekSdk.projects().list();

    }



  //Handling connecting to Fleek web 
  // const accessTokenServiceB = new ApplicationAccessTokenService({
  //   personalAccessToken: "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhcHA6Y2x6dGd3bHd4MDAwMXVwdnY3MHhneHR5ZSIsInByb2plY3RJZCI6ImNseWtybjZtcjAwMDNudWIxbHZzZXZxZDQiLCJleHAiOjE3MjM2Mjc4NDF9.UgM4NrjzWHS5JPsxrARMqjU-y4PFUE8aRKxkwXr969c",
  //   clientId: 'clykrn6mr0003nub1lvsevqd4',
  //   projectId: 'Test env',
  //   authAppsServiceUrl: 'https://auth-apps.service.fleek.xyz/token?clientId=clykrn6mr0003nub1lvsevqd4',
  // });
  //
  // const fleekSdkInstanceA = new FleekSdk({
  //   accessTokenService: accessTokenServiceB,
  // });
  //
  //console.log(fleekSdkInstanceA.user().listPersonalAccessTokens({ id: 'clykrn6mr0003nub1lvsevqd4' }));
  //
  // //console.log(fleekSdkInstanceA.storage().list({ id: 'clykrn6mr0003nub1lvsevqd4' }));
  // console.log(fleekSdkInstanceA.projects().list());
  //


  //File Upload to fleek
  // async function CreateProj() {
  //
  //   const projects = await fleekSdkInstanceA.projects().list();
  //
  // //  const projectId = await fleekSdkInstanceA.projects().get({ id: 'clykrn6mr0003nub1lvsevqd4' });
  //
  //   console.log(projects)
  // };
  //
  // useEffect(() => {
  //    CreateProj()
  // });
  //
  // async function UploadFile(file) {
  //   // Handling connecting to Fleek web
  //   const accessTokenServiceB = new ApplicationAccessTokenService({
  //     personalAccessToken: "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhcHA6Y2x6dGd3bHd4MDAwMXVwdnY3MHhneHR5ZSIsInByb2plY3RJZCI6ImNseWtybjZtcjAwMDNudWIxbHZzZXZxZDQiLCJleHAiOjE3MjM2Mjc4NDF9.UgM4NrjzWHS5JPsxrARMqjU-y4PFUE8aRKxkwXr969c",
  //     clientId: "clykrn6mr0003nub1lvsevqd4",
  //     projectId: "Test env",
  //   });
  //
  //   const fleekSdkInstanceA = new FleekSdk({
  //     accessTokenService: accessTokenServiceB,
  //   });
  //
  //   try {
  //     // Upload File
  //     const result1 = await fleekSdkInstanceA.storage().uploadFile({ file });
  //     console.log(result1);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }
  //
 
    return (
        <>
        </>
    )
}
export default Fleeker;
